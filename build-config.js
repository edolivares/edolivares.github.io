/**
 * Build Configuration - Portfolio de Eduardo Olivares
 * Sistema de build nativo de Node.js que reemplaza Gulp
 * 
 * @author Eduardo Olivares
 * @version 2.0.0
 */

const fs = require('fs');
const path = require('path');
const {
    execSync
} = require('child_process');
const glob = require('glob');
const cssnano = require('cssnano');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

// ===== CONFIGURACIÓN DE RUTAS =====
const config = {
    // Directorios fuente
    scss: {
        src: 'scss/**/*.scss',
        dest: 'assets/css-sass'
    },
    css: {
        src: 'assets/css/*.css',
        dest: 'assets/css',
        exclude: ['**/*.min.css', '**/bundle*.css']
    },
    js: {
        src: 'assets/js/*.js',
        dest: 'assets/js',
        exclude: ['**/*.min.js', '**/bundle*.js']
    },
    images: {
        src: 'assets/images/**/*',
        dest: 'assets/images'
    },

    // Archivos específicos para bundling
    bundleFiles: {
        css: [
            'assets/css/base.css',
            'assets/css/header-navbar.css',
            'assets/css/sections.css',
            'assets/css/contact-form.css',
            'assets/css/footer.css',
            'assets/css/portfolio.css',
            'assets/css/about.css',
            'assets/css/jobs.css'
        ],
        js: [
            'assets/js/emailjs-config.js',
            'assets/js/vanilla-functions.js',
            'assets/js/header-behavior.js',
            'assets/js/footer-functions.js',
            'assets/js/main.js'
        ]
    }
};

// ===== FUNCIONES DE UTILIDAD =====
function log(message, type = 'info') {
    const colors = {
        info: '\x1b[36m', // Cyan
        success: '\x1b[32m', // Green
        warning: '\x1b[33m', // Yellow
        error: '\x1b[31m' // Red
    };
    const reset = '\x1b[0m';
    console.log(`${colors[type]}${message}${reset}`);
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
        log(`Directorio creado: ${dir}`, 'success');
    }
}

function runCommand(command, description) {
    try {
        log(`Ejecutando: ${description}`, 'info');
        execSync(command, {
            stdio: 'inherit'
        });
        log(`✅ ${description} completado`, 'success');
        return true;
    } catch (error) {
        log(`❌ Error en ${description}: ${error.message}`, 'error');
        return false;
    }
}

// ===== FUNCIONES DE BUILD =====

// Limpiar archivos generados
function clean() {
    log('🧹 Limpiando archivos generados...', 'info');

    const filesToClean = [
        'assets/css-sass/**/*',
        'assets/css/*.min.css',
        'assets/js/*.min.js',
        'assets/css/bundle.css',
        'assets/js/bundle.js'
    ];

    filesToClean.forEach(pattern => {
        const files = glob.sync(pattern);
        files.forEach(file => {
            try {
                fs.unlinkSync(file);
                log(`Archivo eliminado: ${file}`, 'success');
            } catch (error) {
                // Ignorar errores si el archivo no existe
            }
        });
    });

    log('✅ Limpieza completada', 'success');
}

// Compilar SCSS a CSS
function compileSass() {
    log('🎨 Compilando SCSS...', 'info');

    ensureDir(config.scss.dest);

    const scssFiles = glob.sync(config.scss.src);
    if (scssFiles.length === 0) {
        log('⚠️ No se encontraron archivos SCSS para compilar', 'warning');
        return true;
    }

    // Compilar cada archivo SCSS individualmente
    let success = true;
    scssFiles.forEach(file => {
        const outputFile = path.join(config.scss.dest, path.basename(file, '.scss') + '.css');
        const result = runCommand(
            `npx sass "${file}" "${outputFile}" --style=expanded --source-map`,
            `Compilación de ${path.basename(file)}`
        );
        if (!result) success = false;
    });

    return success;
}

// Minificar CSS
async function minifyCss() {
    log('📦 Minificando CSS...', 'info');

    const cssFiles = glob.sync(config.css.src, {
        ignore: config.css.exclude
    });
    if (cssFiles.length === 0) {
        log('⚠️ No se encontraron archivos CSS para minificar', 'warning');
        return true;
    }

    let success = true;
    for (const file of cssFiles) {
        try {
            const outputFile = file.replace('.css', '.min.css');
            const css = fs.readFileSync(file, 'utf8');
            const result = await postcss([cssnano]).process(css, {
                from: file,
                to: outputFile
            });
            fs.writeFileSync(outputFile, result.css);
            log(`✅ Minificación de ${path.basename(file)} completada`, 'success');
        } catch (error) {
            log(`❌ Error minificando ${path.basename(file)}: ${error.message}`, 'error');
            success = false;
        }
    }

    return success;
}

// Minificar JavaScript
function minifyJs() {
    log('⚡ Minificando JavaScript...', 'info');

    const jsFiles = glob.sync(config.js.src, {
        ignore: config.js.exclude
    });
    if (jsFiles.length === 0) {
        log('⚠️ No se encontraron archivos JS para minificar', 'warning');
        return true;
    }

    let success = true;
    jsFiles.forEach(file => {
        const outputFile = file.replace('.js', '.min.js');
        const result = runCommand(
            `npx terser ${file} -o ${outputFile} --compress drop_console=true --mangle`,
            `Minificación de ${path.basename(file)}`
        );
        if (!result) success = false;
    });

    return success;
}

// Crear bundle CSS
async function bundleCss() {
    log('📚 Creando bundle CSS...', 'info');

    const bundleFile = 'assets/css/bundle.css';
    const minBundleFile = 'assets/css/bundle.min.css';

    // Verificar que todos los archivos existan
    const missingFiles = config.bundleFiles.css.filter(file => !fs.existsSync(file));
    if (missingFiles.length > 0) {
        log(`❌ Archivos faltantes para el bundle: ${missingFiles.join(', ')}`, 'error');
        return false;
    }

    // Concatenar archivos CSS
    let bundleContent = '';
    config.bundleFiles.css.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        bundleContent += `/* === ${path.basename(file)} === */\n${content}\n\n`;
    });

    // Guardar bundle no minificado
    fs.writeFileSync(bundleFile, bundleContent);
    log(`✅ Bundle CSS creado: ${bundleFile}`, 'success');

    // Minificar bundle usando PostCSS
    try {
        const result = await postcss([cssnano]).process(bundleContent, {
            from: bundleFile,
            to: minBundleFile
        });
        fs.writeFileSync(minBundleFile, result.css);
        log(`✅ Bundle CSS minificado: ${minBundleFile}`, 'success');
        return true;
    } catch (error) {
        log(`❌ Error minificando bundle CSS: ${error.message}`, 'error');
        return false;
    }
}

// Crear bundle JavaScript
function bundleJs() {
    log('📚 Creando bundle JavaScript...', 'info');

    const bundleFile = 'assets/js/bundle.js';
    const minBundleFile = 'assets/js/bundle.min.js';

    // Verificar que todos los archivos existan
    const missingFiles = config.bundleFiles.js.filter(file => !fs.existsSync(file));
    if (missingFiles.length > 0) {
        log(`❌ Archivos faltantes para el bundle: ${missingFiles.join(', ')}`, 'error');
        return false;
    }

    // Concatenar archivos JavaScript
    let bundleContent = '';
    config.bundleFiles.js.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        bundleContent += `/* === ${path.basename(file)} === */\n${content}\n\n`;
    });

    // Guardar bundle no minificado
    fs.writeFileSync(bundleFile, bundleContent);
    log(`✅ Bundle JS creado: ${bundleFile}`, 'success');

    // Minificar bundle
    const result = runCommand(
        `npx terser ${bundleFile} -o ${minBundleFile} --compress drop_console=true --mangle`,
        'Minificación del bundle JavaScript'
    );

    return result;
}

// Minificar archivos main específicos
function minifyMainFiles() {
    log('🎯 Minificando archivos main...', 'info');

    let success = true;

    // Minificar main.css
    if (fs.existsSync('assets/css/main.css')) {
        const result = runCommand(
            'npx cssnano assets/css/main.css assets/css/main.min.css',
            'Minificación de main.css'
        );
        if (!result) success = false;
    }

    // Minificar main.js
    if (fs.existsSync('assets/js/main.js')) {
        const result = runCommand(
            'npx terser assets/js/main.js -o assets/js/main.min.js --compress drop_console=true',
            'Minificación de main.js'
        );
        if (!result) success = false;
    }

    return success;
}

// Aplicar autoprefixer a CSS
async function applyAutoprefixer() {
    log('🔧 Aplicando autoprefixer...', 'info');

    const cssFiles = glob.sync('assets/css/*.css', {
        ignore: ['**/*.min.css', '**/bundle*.css']
    });
    if (cssFiles.length === 0) {
        log('⚠️ No se encontraron archivos CSS para procesar', 'warning');
        return true;
    }

    let success = true;
    for (const file of cssFiles) {
        try {
            const css = fs.readFileSync(file, 'utf8');
            const result = await postcss([autoprefixer]).process(css, {
                from: file,
                to: file
            });
            fs.writeFileSync(file, result.css);
            log(`✅ Autoprefixer aplicado a ${path.basename(file)}`, 'success');
        } catch (error) {
            log(`❌ Error aplicando autoprefixer a ${path.basename(file)}: ${error.message}`, 'error');
            success = false;
        }
    }

    return success;
}

// ===== FUNCIONES PRINCIPALES =====

// Build completo
async function build() {
    log('🚀 Iniciando build completo...', 'info');

    const steps = [{
            name: 'Limpieza',
            fn: clean
        },
        {
            name: 'Compilación SCSS',
            fn: compileSass
        },
        {
            name: 'Autoprefixer',
            fn: applyAutoprefixer
        },
        {
            name: 'Minificación CSS',
            fn: minifyCss
        },
        {
            name: 'Minificación JS',
            fn: minifyJs
        }
    ];

    let success = true;
    for (const step of steps) {
        try {
            const result = await step.fn();
            if (!result) {
                log(`❌ Falló en: ${step.name}`, 'error');
                success = false;
            }
        } catch (error) {
            log(`❌ Error en ${step.name}: ${error.message}`, 'error');
            success = false;
        }
    }

    if (success) {
        log('🎉 Build completo exitoso!', 'success');
    } else {
        log('💥 Build falló en algún paso', 'error');
    }

    return success;
}

// Build solo SCSS
function buildSass() {
    log('🎨 Build solo SCSS...', 'info');
    return compileSass();
}

// Crear bundles
async function createBundles() {
    log('📚 Creando bundles...', 'info');

    try {
        const cssSuccess = await bundleCss();
        const jsSuccess = await bundleJs();

        if (cssSuccess && jsSuccess) {
            log('🎉 Bundles creados exitosamente!', 'success');
            return true;
        } else {
            log('💥 Error al crear bundles', 'error');
            return false;
        }
    } catch (error) {
        log(`❌ Error creando bundles: ${error.message}`, 'error');
        return false;
    }
}

// ===== EXPORTACIÓN DE FUNCIONES =====
module.exports = {
    // Configuración
    config,

    // Funciones individuales
    clean,
    compileSass,
    minifyCss,
    minifyJs,
    bundleCss,
    bundleJs,
    minifyMainFiles,
    applyAutoprefixer,

    // Funciones principales
    build,
    buildSass,
    createBundles
};

// ===== EJECUCIÓN DIRECTA =====
if (require.main === module) {
    const command = process.argv[2];

    (async () => {
        try {
            switch (command) {
                case 'build':
                    await build();
                    break;
                case 'sass':
                    await buildSass();
                    break;
                case 'bundle':
                    await createBundles();
                    break;
                case 'clean':
                    clean();
                    break;
                case 'minify':
                    await minifyCss() && await minifyJs();
                    break;
                case 'main':
                    await minifyMainFiles();
                    break;
                default:
                    log('Comandos disponibles:', 'info');
                    log('  node build-config.js build    - Build completo', 'info');
                    log('  node build-config.js sass     - Solo compilar SCSS', 'info');
                    log('  node build-config.js bundle   - Crear bundles', 'info');
                    log('  node build-config.js clean    - Limpiar archivos', 'info');
                    log('  node build-config.js minify   - Minificar CSS y JS', 'info');
                    log('  node build-config.js main     - Minificar archivos main', 'info');
            }
        } catch (error) {
            log(`❌ Error ejecutando comando: ${error.message}`, 'error');
            process.exit(1);
        }
    })();
}