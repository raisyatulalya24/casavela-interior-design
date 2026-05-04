document.addEventListener("DOMContentLoaded", ()=>{

// ================= NAV =================
window.showPage = function(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

// ================= DATA =================
const styleData = {
  Scandinavian:{
    desc:"Interior terang, bersih, dominan putih & kayu.",
    colors:["#ffffff","#e8efe6","#d4cfc7","#a3b18a","#f8f5e6"],
    img:"https://i.pinimg.com/736x/a3/c7/ad/a3c7adbe639be91cf325c7497792d8a4.jpg"
  },
  Japanese:{
    desc:"Minimal, tenang, natural.",
    colors:["#f5f5dc","#c2b280","#8b6f47","#a2884b","#672205"],
    img:"https://i.pinimg.com/736x/d8/26/4d/d8264dceb9afce2514000d9612725574.jpg"
  }
};

// ================= RENDER STYLE =================
const styleContainer = document.getElementById("styleContainer");

if(styleContainer){
  Object.keys(styleData).forEach(style=>{
    const c = document.createElement("div");
    c.className="style-card";

    c.innerHTML=`
      <img src="${styleData[style].img}">
      <h4>${style}</h4>
      <p>${styleData[style].desc}</p>
    `;

    styleContainer.appendChild(c);
  });
}

// ================= COLOR PREVIEW =================
const preview = document.getElementById("colorPreview");

if(preview){
  const firstStyle = Object.values(styleData)[0];

  firstStyle.colors.slice(0,4).forEach(c=>{
    const box=document.createElement("div");
    box.className="color-box";
    box.style.background=c;
    preview.appendChild(box);
  });
}

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

    // ===== DRAG START (MOUSE) =====
    wrapper.addEventListener("mousedown", (e)=>{
      if(e.target === resize || e.target === del) return;

      activeItem = wrapper;

      const rect = wrapper.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      wrapper.style.zIndex = Date.now();
    });

wrapper.addEventListener("touchstart", (e)=>{
  e.preventDefault(); // 🔥 INI KUNCI UTAMA

  const touch = e.touches[0];

  activeItem = wrapper;

  const rect = wrapper.getBoundingClientRect();
  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  isResizing = false;

  wrapper.style.zIndex = Date.now();
});

    // ===== RESIZE START =====
    resize.addEventListener("mousedown", (e)=>{
      e.stopPropagation();
      activeItem = wrapper;
      isResizing = true;
    });

  resize.addEventListener("touchstart", (e)=>{
  e.preventDefault(); // 🔥 penting

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

  e.preventDefault(); // 🔥 WAJIB

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
}, { passive: false }); // 🔥 SUPER PENTING

  e.preventDefault();
});

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
