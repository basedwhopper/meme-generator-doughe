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
    doughe: 'https://i.imgur.com/FY7cOpI.png',
    doughe1: 'https://i.imgur.com/6rUrlWH.png',
    doughe2: 'https://i.imgur.com/VXseKef.png',
    doughe3: 'https://i.imgur.com/iETCfEE.png',
    doughe4: 'https://i.imgur.com/qHHd1HY.png',
    doughe5: 'https://i.imgur.com/9H1tCgF.png',
    doughe6: 'https://i.imgur.com/tp6QUck.png',
    doughe7: 'https://i.imgur.com/HWNlWNp.png',
    doughe8: 'https://i.imgur.com/1Dj0bu7.png',
    doughe9: 'https://i.imgur.com/GLxvu7Z.png',
    doughe10: 'https://i.imgur.com/bV9zIjG.png',
    doughe11: 'https://i.imgur.com/qZDcN59.png',
    doughe12: 'https://i.imgur.com/SUcMQqJ.png',
    doughe13: 'https://i.imgur.com/IVCQzoY.png',
    hat1: 'https://i.imgur.com/ZSsIGMh.png',
    hat2: 'https://i.imgur.com/feBcp0K.png',
    hat3: 'https://i.imgur.com/jlq11dE.png',
    hat4: 'https://i.imgur.com/CUNjqvD.png',
    hat5: 'https://i.imgur.com/WCiKIwU.png',
    hat6: 'https://i.imgur.com/ZfDUKuF.png',
    hat7: 'https://i.imgur.com/MnJkPoQ.png'
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
