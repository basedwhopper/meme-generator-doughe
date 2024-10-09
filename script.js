console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');

  const canvas = new fabric.Canvas('canvas', {
    width: 500,
    height: 500
  });
  console.log('Canvas initialized');

  const baseImageUpload = document.getElementById('baseImageUpload');
  const overlaySelect = document.getElementById('overlaySelect');
  const exportButton = document.getElementById('exportButton');

  const overlayImages = {
    doughe: 'https://i.imgur.com/FY7cOpI.png'
  };

  baseImageUpload.addEventListener('change', handleImageUpload);
  overlaySelect.addEventListener('change', handleOverlaySelect);
  exportButton.addEventListener('click', exportImage);

  function handleImageUpload(e) {
    console.log('Image upload triggered');
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      fabric.Image.fromURL(event.target.result, function(img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
        });
      });
    };

    reader.readAsDataURL(file);
  }

  function handleOverlaySelect(e) {
    console.log('Overlay select triggered');
    const selectedOverlay = e.target.value;
    if (selectedOverlay && overlayImages[selectedOverlay]) {
      addOverlay(overlayImages[selectedOverlay]);
    }
  }

  function addOverlay(url) {
    console.log('Adding overlay:', url);
    fabric.Image.fromURL(url, function(img) {
      img.scaleToWidth(canvas.width / 2);
      canvas.add(img);
      canvas.renderAll();
    }, { crossOrigin: 'anonymous' });
  }

  function exportImage() {
    console.log('Export image triggered');
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meme.png';
    link.click();
  }

  console.log('All event listeners set up');
});
