// Global state
let currentFiles = [];
let currentTool = null;

// Tool configurations and templates
const toolTemplates = {
    'pdf-to-word': {
        title: 'PDF to Word Converter',
        description: 'Convert your PDF files to editable Word documents',
        accept: '.pdf',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📄</div>
                <h4>Click to select PDF file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'pdf-to-excel': {
        title: 'PDF to Excel Converter',
        description: 'Extract tables from PDF to Excel spreadsheets',
        accept: '.pdf',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📊</div>
                <h4>Click to select PDF file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'pdf-to-image': {
        title: 'PDF to Image Converter',
        description: 'Convert PDF pages to JPG or PNG images',
        accept: '.pdf',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🖼️</div>
                <h4>Click to select PDF file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Output Format:</label>
                    <select id="imageFormat">
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>Quality (for JPEG): <span id="qualityValue">85</span>%</label>
                    <input type="range" id="quality" min="1" max="100" value="85" oninput="document.getElementById('qualityValue').textContent = this.value">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'image-converter': {
        title: 'Image Format Converter',
        description: 'Convert between JPG, PNG, WebP, and other formats',
        accept: 'image/*',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🎨</div>
                <h4>Click to select image</h4>
                <p>Supports JPG, PNG, WebP, HEIC and more</p>
                <input type="file" id="fileInput" class="file-input" accept="image/*">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Convert to:</label>
                    <select id="outputFormat">
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="webp">WebP</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>Quality: <span id="qualityValue">90</span>%</label>
                    <input type="range" id="quality" min="1" max="100" value="90" oninput="document.getElementById('qualityValue').textContent = this.value">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'jpg-to-png': {
        title: 'JPG to PNG Converter',
        description: 'Convert JPG images to PNG format',
        accept: 'image/jpeg,image/jpg',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🖼️</div>
                <h4>Click to select JPG image</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="image/jpeg,image/jpg">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'png-to-jpg': {
        title: 'PNG to JPG Converter',
        description: 'Convert PNG images to JPG format',
        accept: 'image/png',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🖼️</div>
                <h4>Click to select PNG image</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="image/png">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Quality: <span id="qualityValue">90</span>%</label>
                    <input type="range" id="quality" min="1" max="100" value="90" oninput="document.getElementById('qualityValue').textContent = this.value">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'video-to-mp4': {
        title: 'Video to MP4 Converter',
        description: 'Convert any video format to MP4',
        accept: 'video/*',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> Video conversion requires FFmpeg. For client-side conversion, large files may take time to process. Consider using desktop software for very large videos.
            </div>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🎬</div>
                <h4>Click to select video file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="video/*">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'video-to-gif': {
        title: 'Video to GIF Converter',
        description: 'Create animated GIFs from your videos',
        accept: 'video/*',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> For best results, use short video clips (under 30 seconds). Longer videos will result in large GIF files.
            </div>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🎞️</div>
                <h4>Click to select video file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="video/*">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Frame Rate (FPS):</label>
                    <input type="number" id="fps" min="5" max="30" value="10">
                </div>
                <div class="option-group">
                    <label>Width (pixels):</label>
                    <input type="number" id="width" min="100" max="1000" value="480">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'docx-to-pdf': {
        title: 'DOCX to PDF Converter',
        description: 'Convert Word documents to PDF format',
        accept: '.docx,.doc',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> DOCX to PDF conversion requires backend processing. This demo shows the interface. Consider using libraries like docx2pdf or online APIs for actual conversion.
            </div>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📝</div>
                <h4>Click to select Word document</h4>
                <p>Supports .docx and .doc files</p>
                <input type="file" id="fileInput" class="file-input" accept=".docx,.doc">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'txt-to-pdf': {
        title: 'TXT to PDF Converter',
        description: 'Convert text files to PDF documents',
        accept: '.txt',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📄</div>
                <h4>Click to select text file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".txt">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'audio-converter': {
        title: 'Audio Format Converter',
        description: 'Convert between MP3, WAV, OGG, and other audio formats',
        accept: 'audio/*',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> Audio conversion requires FFmpeg or similar tools. This interface demonstrates the UI. For production, integrate with backend audio processing services.
            </div>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🎵</div>
                <h4>Click to select audio file</h4>
                <p>Supports MP3, WAV, OGG, M4A and more</p>
                <input type="file" id="fileInput" class="file-input" accept="audio/*">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Convert to:</label>
                    <select id="outputFormat">
                        <option value="mp3">MP3</option>
                        <option value="wav">WAV</option>
                        <option value="ogg">OGG</option>
                        <option value="m4a">M4A</option>
                    </select>
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'pdf-merge': {
        title: 'Merge PDF Files',
        description: 'Combine multiple PDF files into one document',
        accept: '.pdf',
        multiple: true,
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📑</div>
                <h4>Click to select PDF files</h4>
                <p>Select multiple files to merge</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf" multiple>
            </div>
            <div class="file-list" id="fileList"></div>
            <div id="mergeButton" style="display: none; text-align: center; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="processPDFMerge()">Merge PDFs</button>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'pdf-split': {
        title: 'Split PDF Files',
        description: 'Split a PDF into multiple files or extract specific pages',
        accept: '.pdf',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">✂️</div>
                <h4>Click to select PDF file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Split Method:</label>
                    <select id="splitMethod">
                        <option value="pages">By page range</option>
                        <option value="all">Extract all pages separately</option>
                    </select>
                </div>
                <div class="option-group" id="pageRangeGroup">
                    <label>Page Range (e.g., 1-3, 5, 7-9):</label>
                    <input type="text" id="pageRange" placeholder="1-3, 5, 7-9">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'pdf-compress': {
        title: 'Compress PDF Files',
        description: 'Reduce PDF file size while maintaining quality',
        accept: '.pdf',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🗜️</div>
                <h4>Click to select PDF file</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept=".pdf">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Compression Level:</label>
                    <select id="compressionLevel">
                        <option value="low">Low (Better quality)</option>
                        <option value="medium" selected>Medium (Balanced)</option>
                        <option value="high">High (Smaller size)</option>
                    </select>
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'image-compress': {
        title: 'Image Compressor',
        description: 'Compress images to reduce file size',
        accept: 'image/*',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📦</div>
                <h4>Click to select image</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="image/*">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Quality: <span id="qualityValue">80</span>%</label>
                    <input type="range" id="quality" min="1" max="100" value="80" oninput="document.getElementById('qualityValue').textContent = this.value">
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'image-resize': {
        title: 'Image Resizer',
        description: 'Resize images to specific dimensions',
        accept: 'image/*',
        template: `
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📏</div>
                <h4>Click to select image</h4>
                <p>or drag and drop here</p>
                <input type="file" id="fileInput" class="file-input" accept="image/*">
            </div>
            <div class="options-panel" id="optionsPanel" style="display: none;">
                <div class="option-group">
                    <label>Width (pixels):</label>
                    <input type="number" id="width" min="1" placeholder="Auto">
                </div>
                <div class="option-group">
                    <label>Height (pixels):</label>
                    <input type="number" id="height" min="1" placeholder="Auto">
                </div>
                <div class="option-group">
                    <label>
                        <input type="checkbox" id="maintainAspect" checked> Maintain aspect ratio
                    </label>
                </div>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'background-remover': {
        title: 'Background Remover',
        description: 'Remove backgrounds from images automatically',
        accept: 'image/*',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> Background removal requires ML models. This demo uses canvas-based edge detection. For production-quality results, integrate with services like remove.bg API or use @imgly/background-removal library.
            </div>
            <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">🎭</div>
                <h4>Click to select image</h4>
                <p>Works best with clear subjects</p>
                <input type="file" id="fileInput" class="file-input" accept="image/*">
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'meta-checker': {
        title: 'Meta Tag Checker',
        description: 'Analyze and validate meta tags on any webpage',
        template: `
            <div class="option-group">
                <label>Enter Website URL:</label>
                <input type="text" id="websiteUrl" placeholder="https://example.com">
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="checkMetaTags()">Analyze Meta Tags</button>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    },
    'broken-link-checker': {
        title: 'Broken Link Checker',
        description: 'Find and report broken links on your website',
        template: `
            <div class="alert alert-warning">
                <strong>Note:</strong> Checking external links requires CORS support or a backend proxy. This tool checks link format and accessibility.
            </div>
            <div class="option-group">
                <label>Enter Website URL:</label>
                <input type="text" id="websiteUrl" placeholder="https://example.com">
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="checkBrokenLinks()">Check Links</button>
            </div>
            <div class="result-area" id="resultArea"></div>
            <div class="spinner" id="spinner"></div>
        `
    }
};

// Modal functions
function openTool(toolName) {
    currentTool = toolName;
    const modal = document.getElementById('toolModal');
    const toolContent = document.getElementById('toolContent');
    const config = toolTemplates[toolName];

    if (!config) {
        alert('Tool not yet implemented');
        return;
    }

    toolContent.innerHTML = `
        <div class="tool-interface">
            <h3>${config.title}</h3>
            <p>${config.description}</p>
            ${config.template}
        </div>
    `;

    modal.style.display = 'block';

    // Setup file input handler
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);

        // Setup drag and drop
        const uploadArea = document.querySelector('.file-upload-area');
        if (uploadArea) {
            uploadArea.addEventListener('dragover', handleDragOver);
            uploadArea.addEventListener('dragleave', handleDragLeave);
            uploadArea.addEventListener('drop', handleDrop);
        }
    }
}

function closeModal() {
    const modal = document.getElementById('toolModal');
    modal.style.display = 'none';
    currentFiles = [];
    currentTool = null;
}

// File handling
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        if (e.target.multiple) {
            currentFiles = Array.from(files);
            displayFileList(currentFiles);
        } else {
            processFile(files[0]);
        }
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('fileInput');
        if (fileInput.multiple) {
            currentFiles = Array.from(files);
            displayFileList(currentFiles);
        } else {
            processFile(files[0]);
        }
    }
}

function displayFileList(files) {
    const fileList = document.getElementById('fileList');
    const mergeButton = document.getElementById('mergeButton');

    if (!fileList) return;

    fileList.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-item-name">${file.name}</span>
            <span class="file-item-size">${formatFileSize(file.size)}</span>
            <button class="file-item-remove" onclick="removeFile(${index})">Remove</button>
        `;
        fileList.appendChild(fileItem);
    });

    if (mergeButton) {
        mergeButton.style.display = files.length > 1 ? 'block' : 'none';
    }
}

function removeFile(index) {
    currentFiles.splice(index, 1);
    displayFileList(currentFiles);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// File processing functions
function processFile(file) {
    showSpinner();

    const optionsPanel = document.getElementById('optionsPanel');
    if (optionsPanel) {
        optionsPanel.style.display = 'block';
    }

    // Route to appropriate processor
    switch(currentTool) {
        case 'pdf-to-image':
            processPDFToImage(file);
            break;
        case 'image-converter':
        case 'jpg-to-png':
        case 'png-to-jpg':
            processImageConversion(file);
            break;
        case 'image-compress':
            processImageCompression(file);
            break;
        case 'image-resize':
            processImageResize(file);
            break;
        case 'background-remover':
            processBackgroundRemoval(file);
            break;
        case 'txt-to-pdf':
            processTxtToPDF(file);
            break;
        case 'pdf-split':
            processPDFSplit(file);
            break;
        case 'pdf-compress':
            processPDFCompress(file);
            break;
        default:
            showMessage('This converter is in development. File processing functionality will be added soon.', 'warning');
            hideSpinner();
            break;
    }
}

// Image Conversion
async function processImageConversion(file) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let outputFormat = 'png';
            let quality = 0.9;

            if (currentTool === 'png-to-jpg') {
                outputFormat = 'jpeg';
                quality = (document.getElementById('quality')?.value || 90) / 100;
            } else if (currentTool === 'image-converter') {
                const formatSelect = document.getElementById('outputFormat');
                outputFormat = formatSelect ? formatSelect.value : 'png';
                quality = (document.getElementById('quality')?.value || 90) / 100;
            }

            const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : `image/${outputFormat}`;
            canvas.toBlob(function(blob) {
                hideSpinner();
                displayResult(blob, `converted.${outputFormat}`, file.size);
            }, mimeType, quality);
        };

        img.src = URL.createObjectURL(file);
    } catch (error) {
        hideSpinner();
        showMessage('Error converting image: ' + error.message, 'danger');
    }
}

// Image Compression
async function processImageCompression(file) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const quality = (document.getElementById('quality')?.value || 80) / 100;
            const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

            canvas.toBlob(function(blob) {
                hideSpinner();
                displayResult(blob, 'compressed_' + file.name, file.size);
            }, mimeType, quality);
        };

        img.src = URL.createObjectURL(file);
    } catch (error) {
        hideSpinner();
        showMessage('Error compressing image: ' + error.message, 'danger');
    }
}

// Image Resize
async function processImageResize(file) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            let width = parseInt(document.getElementById('width')?.value) || img.width;
            let height = parseInt(document.getElementById('height')?.value) || img.height;
            const maintainAspect = document.getElementById('maintainAspect')?.checked;

            if (maintainAspect) {
                if (width && !height) {
                    height = (img.height / img.width) * width;
                } else if (height && !width) {
                    width = (img.width / img.height) * height;
                } else if (width && height) {
                    const ratio = Math.min(width / img.width, height / img.height);
                    width = img.width * ratio;
                    height = img.height * ratio;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function(blob) {
                hideSpinner();
                displayResult(blob, 'resized_' + file.name, file.size);
            }, file.type, 0.9);
        };

        img.src = URL.createObjectURL(file);
    } catch (error) {
        hideSpinner();
        showMessage('Error resizing image: ' + error.message, 'danger');
    }
}

// Background Removal (Basic implementation)
async function processBackgroundRemoval(file) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Simple background removal based on color similarity to corners
            // This is a basic implementation - for production use ML-based solutions
            const cornerPixel = {
                r: data[0],
                g: data[1],
                b: data[2]
            };

            const threshold = 40;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const diff = Math.abs(r - cornerPixel.r) +
                           Math.abs(g - cornerPixel.g) +
                           Math.abs(b - cornerPixel.b);

                if (diff < threshold) {
                    data[i + 3] = 0; // Make transparent
                }
            }

            ctx.putImageData(imageData, 0, 0);

            canvas.toBlob(function(blob) {
                hideSpinner();
                showMessage('Background removed using basic algorithm. For better results, use ML-based tools.', 'warning');
                displayResult(blob, 'no_bg_' + file.name.replace(/\.[^/.]+$/, '.png'), file.size);
            }, 'image/png');
        };

        img.src = URL.createObjectURL(file);
    } catch (error) {
        hideSpinner();
        showMessage('Error removing background: ' + error.message, 'danger');
    }
}

// PDF to Image (requires pdf.js or similar)
async function processPDFToImage(file) {
    hideSpinner();
    showMessage('PDF to Image conversion requires additional libraries (PDF.js). This is a demonstration interface. For production, integrate with PDF.js or similar libraries.', 'warning');
}

// TXT to PDF
async function processTxtToPDF(file) {
    try {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const text = e.target.result;

            // Using pdf-lib if available
            if (typeof PDFLib !== 'undefined') {
                const pdfDoc = await PDFLib.PDFDocument.create();
                const page = pdfDoc.addPage([595, 842]); // A4 size
                const { width, height } = page.getSize();
                const fontSize = 12;
                const margin = 50;
                const lineHeight = fontSize * 1.2;

                const lines = text.split('\n');
                let y = height - margin;

                for (const line of lines) {
                    if (y < margin) {
                        const newPage = pdfDoc.addPage([595, 842]);
                        y = height - margin;
                    }

                    page.drawText(line.substring(0, 80), {
                        x: margin,
                        y: y,
                        size: fontSize,
                    });

                    y -= lineHeight;
                }

                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                hideSpinner();
                displayResult(blob, file.name.replace('.txt', '.pdf'), file.size);
            } else {
                hideSpinner();
                showMessage('PDF library not loaded. Please refresh the page.', 'danger');
            }
        };
        reader.readAsText(file);
    } catch (error) {
        hideSpinner();
        showMessage('Error converting to PDF: ' + error.message, 'danger');
    }
}

// PDF Merge
async function processPDFMerge() {
    if (currentFiles.length < 2) {
        showMessage('Please select at least 2 PDF files to merge', 'warning');
        return;
    }

    showSpinner();

    try {
        if (typeof PDFLib !== 'undefined') {
            const mergedPdf = await PDFLib.PDFDocument.create();

            for (const file of currentFiles) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            hideSpinner();
            displayResult(blob, 'merged.pdf', currentFiles.reduce((sum, f) => sum + f.size, 0));
        } else {
            hideSpinner();
            showMessage('PDF library not loaded. Please refresh the page.', 'danger');
        }
    } catch (error) {
        hideSpinner();
        showMessage('Error merging PDFs: ' + error.message, 'danger');
    }
}

// PDF Split
async function processPDFSplit(file) {
    hideSpinner();
    showMessage('PDF split functionality requires PDF.js library. This is a demonstration interface.', 'warning');
}

// PDF Compress
async function processPDFCompress(file) {
    hideSpinner();
    showMessage('PDF compression requires specialized libraries and processing. This is a demonstration interface. Consider using libraries like Ghostscript or online APIs for production.', 'warning');
}

// SEO Tools
async function checkMetaTags() {
    const url = document.getElementById('websiteUrl')?.value;
    if (!url) {
        showMessage('Please enter a URL', 'warning');
        return;
    }

    showSpinner();

    // This is a demonstration - actual implementation would require CORS proxy or backend
    setTimeout(() => {
        hideSpinner();
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        resultArea.innerHTML = `
            <div class="alert alert-warning">
                <strong>Note:</strong> Checking meta tags from external sites requires CORS support or a backend proxy. This is a demonstration of the expected output.
            </div>
            <div class="seo-results">
                <h4>Meta Tags Analysis for: ${url}</h4>
                <ul>
                    <li class="success">✓ Title tag found (60 characters)</li>
                    <li class="success">✓ Meta description found (155 characters)</li>
                    <li class="warning">⚠ Meta keywords tag is deprecated</li>
                    <li class="success">✓ Open Graph tags present</li>
                    <li class="success">✓ Twitter Card tags present</li>
                    <li class="error">✗ Canonical URL missing</li>
                </ul>
                <div class="alert alert-warning" style="margin-top: 1rem;">
                    To implement this feature, you'll need to either:<br>
                    1. Set up a backend proxy to fetch external pages<br>
                    2. Use a third-party API service<br>
                    3. Create a browser extension with appropriate permissions
                </div>
            </div>
        `;
    }, 1000);
}

async function checkBrokenLinks() {
    const url = document.getElementById('websiteUrl')?.value;
    if (!url) {
        showMessage('Please enter a URL', 'warning');
        return;
    }

    showSpinner();

    // This is a demonstration
    setTimeout(() => {
        hideSpinner();
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        resultArea.innerHTML = `
            <div class="seo-results">
                <h4>Link Check Results for: ${url}</h4>
                <ul>
                    <li class="success">✓ Total links found: 47</li>
                    <li class="success">✓ Valid internal links: 32</li>
                    <li class="success">✓ Valid external links: 13</li>
                    <li class="error">✗ Broken links: 2</li>
                </ul>
                <h4 style="margin-top: 1.5rem;">Broken Links:</h4>
                <ul>
                    <li class="error">https://example.com/old-page (404 Not Found)</li>
                    <li class="error">https://example.com/missing-image.jpg (404 Not Found)</li>
                </ul>
                <div class="alert alert-warning" style="margin-top: 1rem;">
                    This is a demonstration. Actual link checking requires:<br>
                    1. Backend service to crawl and check links<br>
                    2. CORS proxy for external link validation<br>
                    3. Rate limiting and caching mechanisms
                </div>
            </div>
        `;
    }, 1500);
}

// UI Helper functions
function showSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.style.display = 'block';
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.style.display = 'none';
}

function showMessage(message, type = 'info') {
    const resultArea = document.getElementById('resultArea');
    if (resultArea) {
        resultArea.style.display = 'block';
        resultArea.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    }
}

function displayResult(blob, filename, originalSize) {
    const resultArea = document.getElementById('resultArea');
    if (!resultArea) return;

    resultArea.style.display = 'block';

    const url = URL.createObjectURL(blob);
    const isImage = blob.type.startsWith('image/');

    let preview = '';
    if (isImage) {
        preview = `
            <div class="result-preview">
                <h4>Preview:</h4>
                <img src="${url}" alt="Converted image">
            </div>
        `;
    }

    resultArea.innerHTML = `
        <div class="alert alert-success">
            ✓ File processed successfully!
        </div>
        ${preview}
        <div class="file-info">
            <p><strong>Filename:</strong> ${filename}</p>
            <p><strong>Original size:</strong> ${formatFileSize(originalSize)}</p>
            <p><strong>New size:</strong> ${formatFileSize(blob.size)}</p>
            <p><strong>Reduction:</strong> ${Math.round((1 - blob.size/originalSize) * 100)}%</p>
        </div>
        <div style="text-align: center;">
            <a href="${url}" download="${filename}" class="btn btn-success">Download File</a>
        </div>
    `;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
