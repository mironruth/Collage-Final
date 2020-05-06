let width = 800
let height = 0

let streaming = false

let video = null
let canvasPhoto = null
let startButton = null
let startMixingButton = null
let lips = null
let glasses = null
let deco = null
let flower = null
let hair = null
let gold = null
let happy = null
let frame = null
let stroke = null
let bday = null
let cone = null
let color = null
let pink = null
let glow = null
let green = null
let heart = null

let db = null
let returnButton = null

let cameraContentarea = null
let canvasMixArea = null

let canvas = null
let photo = null

let backButton = null
let forwardButton = null

function startUp() {
  cameraContentarea = document.querySelector('#cameraContentarea')
  canvasMixArea = document.querySelector('#canvasMixArea')
  cameraContentarea.className = 'displayBlock'
  canvasMixArea.className = 'displayNone'

  video = document.querySelector('#video')
  canvasPhoto = document.querySelector('#canvasPhoto')
  photo = document.querySelector('#photo')
  startButton = document.querySelector('#startButton')
  lips = document.querySelector('#lips')
  glasses = document.querySelector('#glasses')
  deco = document.querySelector('#deco')
  flower = document.querySelector('#flower')
  hair = document.querySelector('#hair')
  gold = document.querySelector('#gold')
  happy = document.querySelector('#happy')
  frame = document.querySelector('#frame')
  stroke = document.querySelector('#stroke')
  bday = document.querySelector('#bday')
  color = document.querySelector('#color')
  pink = document.querySelector('#pink')
  cone = document.querySelector('#cone')
  glow = document.querySelector('#glow')
  green = document.querySelector('#green')
  heart = document.querySelector('#heart')

  db = document.querySelector('#downloadButton')
  returnButton = document.querySelector('#returnButton')
  startMixingButton = document.querySelector('#startMixingButton')

  backButton = document.querySelector('#backButton')
  forwardButton = document.querySelector('#forwardButton')

  canvas = new fabric.Canvas('c')

  startButton.addEventListener('click', takePicture, false)
  startMixingButton.addEventListener('click', startMixingFunction, false)
  db.addEventListener('click', saveImage, false)
  returnButton.addEventListener('click', returnFunction, false)
  lips.addEventListener('click', placeImage, false)
  glasses.addEventListener('click', placeImage, false)
  deco.addEventListener('click', placeImage, false)
  flower.addEventListener('click', placeImage, false)
  hair.addEventListener('click', placeImage, false)
  gold.addEventListener('click', placeImage, false)
  happy.addEventListener('click', placeImage, false)
  frame.addEventListener('click', placeImage, false)
  stroke.addEventListener('click', placeImage, false)
  bday.addEventListener('click', placeImage, false)
  color.addEventListener('click', placeImage, false)
  pink.addEventListener('click', placeImage, false)
  cone.addEventListener('click', placeImage, false)
  glow.addEventListener('click', placeImage, false)
  green.addEventListener('click', placeImage, false)
  heart.addEventListener('click', placeImage, false)

  backButton.addEventListener('click', pushBack, false)
  forwardButton.addEventListener('click', pushForward, false)


  video.addEventListener('click', function() {
    video.play()
  }, false)

  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(function(stream) {
      video.srcObject = stream
      video.play()
    })
    .catch(function(err) {
      console.log("An error has happened: " + err);
    })

  video.addEventListener('canplay', function(e) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width)

      if (isNaN(height)) {
        height = width / (4 / 3)
      }

      video.setAttribute('width', width)
      video.setAttribute('height', height)
      canvasPhoto.setAttribute('width', width)
      canvasPhoto.setAttribute('height', height)

      streaming = true
    }
  }, false)

  clearPhoto()

} //end StartUp

function clearPhoto() {
  let ctx = canvasPhoto.getContext('2d')
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvasPhoto.width, canvasPhoto.height)
  let data = canvasPhoto.toDataURL('image/png')
  photo.setAttribute('src', data)
}

function takePicture() {
  let ctx = canvasPhoto.getContext('2d')
  if (width && height) {
    canvasPhoto.width = width
    canvasPhoto.height = height
    ctx.drawImage(video, 0, 0, width, height)

    let data = canvasPhoto.toDataURL('image/png')
    photo.setAttribute('src', data)
  } else {
    clearPhoto()
  }

} //end takePicture

////////////////////////////////end camera
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

function startMixingFunction() {
  window.addEventListener('keyup', deleteObjectKeyboard, false)
  canvas.setBackgroundColor('#CDCDC1')

  cameraContentarea.className = 'displayNone'
  canvasMixArea.className = 'displayBlock'

  //delete item stuff
  let deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"
  let img = document.createElement('img')
  img.src = deleteIcon

  fabric.Object.prototype.transparentCorners = false
  fabric.Object.prototype.cornerColor = 'red'
  fabric.Object.prototype.cornerStyle = 'circle'

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    position: {
      x: 0.5,
      y: -0.5
    },
    offsetX: 16,
    offsetY: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 24
  })

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    let size = this.cornerSize
    ctx.save()
    ctx.translate(left, top)
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
    ctx.drawImage(img, -size / 2, -size / 2, size, size)
    ctx.restore()
  }

  function deleteObject(eventData, target) {
    let canvas = target.canvas
    canvas.remove(target)
    canvas.requestRenderAll()
  }

  ///

  let webcamPicture = document.querySelector('#photo')
  let webcamPictureSrc = webcamPicture.getAttribute('src')
  fabric.Image.fromURL(webcamPictureSrc, function(wImg) {
    wImg.set({
      left: 50,
      top: 50
    })
    canvas.add(wImg)
  })

  // fabric.Image.fromURL('images/hair.png', function(hImg){
  //   hImg.set({
  //     left: Math.random() * 600 + 100,
  //     top: Math.random() * 400 +100
  //   })
  //   canvas.add(hImg)
  // })
} //end startMixingFunction



function deleteObjectKeyboard() {
  canvas.remove(canvas.getActiveObject())
  canvas.requestRenderAll()
} //end deleteObjectKeyboard

function pushBack() {
  canvas.sendBackwards(canvas.getActiveObject())
  canvas.discardActiveObject()
  canvas.requestRenderAll()
  console.log('back')
} // end pushBack

function pushForward() {
  canvas.bringForward(canvas.getActiveObject())
  canvas.discardActiveObject()
  canvas.requestRenderAll()
  console.log('forward')
} // end push Forward

function saveImage(e) {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let td = `${months[d.getMonth()]}-${d.getDate()}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`

  e.target.download = `myImage-${td}.png` //'myImage.png'
  e.target.href = canvas.toDataURL('image/png')

} //end saveImage

function returnFunction() {
  cameraContentarea.className = 'displayBlock'
  canvasMixArea.className = 'displayNone'
  canvas.clear()
  clearPhoto()

} //end returnFunction

function placeImage(e) {
  console.log(e.currentTarget.getAttribute('src'))
  let newImg = e.currentTarget.getAttribute('src')
  fabric.Image.fromURL(newImg, function(nImg) {
    let newX = canvas.width / 2 - nImg.width / 2
    let newY = canvas.height / 2 - nImg.height / 2
    nImg.set({
      left: newX,
      top: newY
    })
    canvas.add(nImg)
  })

} //end placeImage


window.addEventListener('load', startUp, false)
