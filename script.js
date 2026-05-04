document.addEventListener("DOMContentLoaded", ()=>{

// ================= NAV =================
window.showPage = function(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

// ================= DESIGN SYSTEM =================
const room = document.getElementById("room");
const upload = document.getElementById("uploadImg");

let activeItem = null;
let offsetX = 0;
let offsetY = 0;
let isResizing = false;

// ===== ADD IMAGE =====
if(upload){
  upload.addEventListener("change", e=>{
    const file = e.target.files[0];
    if(!file) return;

    const url = URL.createObjectURL(file);

    const wrapper = document.createElement("div");
    wrapper.className = "item";

    wrapper.style.left = "60px";
    wrapper.style.top = "60px";
    wrapper.style.width = "120px";
    wrapper.style.zIndex = Date.now();

    const img = document.createElement("img");
    img.src = url;

    const del = document.createElement("button");
    del.innerText = "✕";
    del.className = "delete-btn";

    del.onclick = (e)=>{
      e.stopPropagation();
      wrapper.remove();
    };

    const resize = document.createElement("div");
    resize.className = "resize";

    wrapper.appendChild(img);
    wrapper.appendChild(del);
    wrapper.appendChild(resize);
    room.appendChild(wrapper);

    // ===== MOUSE DRAG =====
    wrapper.addEventListener("mousedown", (e)=>{
      if(e.target === resize || e.target === del) return;

      activeItem = wrapper;

      const rect = wrapper.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      isResizing = false;
      wrapper.style.zIndex = Date.now();
    });

    // ===== TOUCH DRAG (HP) =====
    wrapper.addEventListener("touchstart", (e)=>{
      if(e.target.classList.contains("resize")) return;

      const touch = e.touches[0];

      activeItem = wrapper;

      const rect = wrapper.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      isResizing = false;
      wrapper.style.zIndex = Date.now();
    });

    // ===== RESIZE =====
    resize.addEventListener("mousedown", (e)=>{
      e.stopPropagation();
      activeItem = wrapper;
      isResizing = true;
    });

    resize.addEventListener("touchstart", (e)=>{
      e.stopPropagation();
      activeItem = wrapper;
      isResizing = true;
    });

  });
}

// ===== MOVE (MOUSE) =====
document.addEventListener("mousemove", (e)=>{
  if(!activeItem) return;

  const roomRect = room.getBoundingClientRect();

  if(isResizing){
    let newWidth = e.clientX - activeItem.getBoundingClientRect().left;
    if(newWidth < 60) newWidth = 60;

    activeItem.style.width = newWidth + "px";
  }else{
    let x = e.clientX - roomRect.left - offsetX;
    let y = e.clientY - roomRect.top - offsetY;

    activeItem.style.left = x + "px";
    activeItem.style.top = y + "px";
  }
});

// ===== MOVE (TOUCH) =====
document.addEventListener("touchmove", (e)=>{
  if(!activeItem) return;

  const touch = e.touches[0];
  const roomRect = room.getBoundingClientRect();

  if(isResizing){
    let newWidth = touch.clientX - activeItem.getBoundingClientRect().left;
    if(newWidth < 60) newWidth = 60;

    activeItem.style.width = newWidth + "px";
  }else{
    let x = touch.clientX - roomRect.left - offsetX;
    let y = touch.clientY - roomRect.top - offsetY;

    activeItem.style.left = x + "px";
    activeItem.style.top = y + "px";
  }

}, { passive:false });

// ===== RELEASE =====
document.addEventListener("mouseup", ()=>{
  activeItem = null;
  isResizing = false;
});

document.addEventListener("touchend", ()=>{
  activeItem = null;
  isResizing = false;
});

// ===== CLEAR =====
window.clearRoom = function(){
  room.innerHTML = "";
};

// ===== SAVE =====
window.saveDesign = function(){
  html2canvas(room).then(canvas=>{
    const data = canvas.toDataURL();

    let arr = JSON.parse(localStorage.getItem("designs")) || [];
    arr.push(data);

    localStorage.setItem("designs", JSON.stringify(arr));
    renderGallery();
  });
};

// ===== DOWNLOAD =====
window.downloadDesign = function(){
  html2canvas(room).then(canvas=>{
    const link = document.createElement("a");
    link.download = "CasaVela-Design.png";
    link.href = canvas.toDataURL();
    link.click();
  });
};

// ===== GALLERY =====
function renderGallery(){
  const g = document.getElementById("gallery");
  if(!g) return;

  g.innerHTML = "";

  let arr = JSON.parse(localStorage.getItem("designs")) || [];

  arr.forEach((src,i)=>{
    const wrap = document.createElement("div");

    const img = document.createElement("img");
    img.src = src;

    const del = document.createElement("button");
    del.innerText = "✕";

    del.onclick = ()=>{
      arr.splice(i,1);
      localStorage.setItem("designs",JSON.stringify(arr));
      renderGallery();
    };

    wrap.appendChild(img);
    wrap.appendChild(del);
    g.appendChild(wrap);
  });
}

renderGallery();

});
