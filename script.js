document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');

  const canvas = new fabric.Canvas('canvas', {
    width: 800,
    height: 600
  });

  console.log('Canvas initialized');

  const scale = window.devicePixelRatio;
  canvas.setWidth(canvas.width * scale);
  canvas.setHeight(canvas.height * scale);
  canvas.setZoom(scale);

  const overlayImages = {
    doughe: 'https://i.imgur.com/k7XWQGa.png'
  };

  function addOverlay(url) {
    console.log('Adding overlay:', url);
    fabric.Image.fromURL(url, function(img) {
      if (img) {
        img.scaleToWidth(canvas.width / 4);
        img.set({
          left: canvas.width / 4,
          top: canvas.height / 4,
        });
        canvas.add(img);
        canvas.renderAll();
        console.log('Overlay added successfully');
      } else {
        console.error('Failed to load image:', url);
        alert('Failed to load overlay image. Please check the image URL.');
      }
    }, { crossOrigin: 'anonymous' });
  }

  document.getElementById('baseImageUpload').addEventListener('change', function(e) {
    console.log('Base image upload triggered');
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(f) {
      fabric.Image.fromURL(f.target.result, function(img) {
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        img.set({
          scaleX: scale,
          scaleY: scale,
          originX: 'center',
          originY: 'center',
          left: canvas.width / 2,
          top: canvas.height / 2
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        console.log('Base image added to canvas');
      }, { crossOrigin: 'anonymous' });
    }
    reader.readAsDataURL(file);
  });

  document.getElementById('overlaySelect').addEventListener('change', function(e) {
    console.log('Overlay select changed');
    const selectedOverlay = e.target.value;
    if (selectedOverlay && overlayImages[selectedOverlay]) {
      addOverlay(overlayImages[selectedOverlay]);
    }
  });

  document.getElementById('exportButton').addEventListener('click', function() {
    console.log('Export button clicked');
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1 / scale
      });
      console.log('Image data URL generated successfully');
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'composed_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Download triggered');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please ensure all images are from the same origin or CORS-enabled.');
    }
  });
});
