document.addEventListener("DOMContentLoaded", ()=>{

// ================= NAV =================
window.showPage = function(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  function setActiveNav(pageId){
  document.querySelectorAll(".nav-links button").forEach(btn=>{
    btn.classList.remove("active-nav");
  });

  const map = {
    homePage:0,
    designPage:1,
    galleryPage:2,
    colorPage:3
  };

  const index = map[pageId];
  document.querySelectorAll(".nav-links button")[index].classList.add("active-nav");
}
};

// ===== STYLE DATA (AMBIL PUNYA KAMU) =====
const styleData = {
  Scandinavian:{
    desc: "Interior bergaya Scandinavian menonjolkan ruang yang terang, bersih, dan lapang. Warna dominan putih dan beige dipadukan dengan elemen kayu terang. Furnitur memiliki bentuk sederhana tanpa banyak ornamen, dengan penataan yang rapi dan tidak padat. Ruangan terasa ringan, natural, dan fungsional.",
    colors:["#ffffff","#e8efe6","#d4cfc7","#a3b18a","#f8f5e6"],
    img:"https://i.pinimg.com/736x/a3/c7/ad/a3c7adbe639be91cf325c7497792d8a4.jpg"
  },
  Japanese:{
    desc: "Gaya Japanese menampilkan ruang yang minimal, tenang, dan terorganisir. Furnitur cenderung rendah dengan penggunaan material alami seperti kayu dan tatami. Warna didominasi tone netral dan earthy. Tata ruang terbuka dengan sedikit elemen dekorasi, menciptakan kesan luas dan damai.",
    colors:["#f5f5dc","#c2b280","#8b6f47","#a2884b","#672205"],
    img:"https://i.pinimg.com/736x/d8/26/4d/d8264dceb9afce2514000d9612725574.jpg"
  },
  Industrial:{
    desc: "Interior industrial menampilkan elemen struktural yang terekspos seperti dinding bata, beton, dan logam. Warna cenderung gelap dan maskulin. Furnitur menggabungkan material kayu dan besi dengan desain sederhana. Tata ruang terasa terbuka dengan kesan unfinished namun kuat secara karakter.",
    colors:["#2c2c2c","#555","#888","#d6d3d3","#5c3b0f"],
    img:"https://i.pinimg.com/736x/c5/0f/a3/c50fa3555a8a5ffa820a84fd663a195e.jpg"
  },
  Bohemian:{
    desc: "Gaya bohemian memiliki tampilan yang bebas dan tidak kaku. Menggunakan banyak tekstur, warna hangat, serta elemen dekoratif seperti kain, tanaman, dan rotan. Penataan ruang cenderung santai dan tidak simetris, memberikan kesan hidup dan personal.",
    colors:["#ffb703","#fb8500","#8ecae6","#e7b652","#204f46"],
    img:"https://i.pinimg.com/736x/a3/6d/84/a36d8474ab2bd0c1ba1ef6dca0a71034.jpg"
  },
  Minimalist:{
    desc: "Minimalist menekankan kesederhanaan dan fungsi. Ruangan hanya berisi elemen penting dengan warna netral seperti putih, abu, dan hitam. Furnitur memiliki desain clean tanpa detail berlebih. Tata ruang sangat rapi dan terbuka, menciptakan kesan bersih dan teratur.",
    colors:["#ffffff","#cccccc","#000000","#565449","#d8cfbc"],
    img:"https://i.pinimg.com/736x/a5/18/25/a518258dd95505be95c240ee999b66a8.jpg"
  },
  Modern:{
    desc: "Gaya modern menampilkan desain yang bersih dengan garis tegas dan struktur jelas. Warna netral dikombinasikan dengan material seperti kaca dan metal. Furnitur terlihat simpel namun elegan. Tata ruang terorganisir dengan keseimbangan antara fungsi dan estetika.",
    colors:["#ffffff","#000","#888","#f4efe6","#5e6c5b"],
    img:"https://i.pinimg.com/736x/d9/63/ee/d963ee3f5c12b93796f633a7db6a1475.jpg"
  },
  Classic:{
    desc: "Interior klasik menonjolkan kesan elegan dan formal. Menggunakan warna hangat seperti cream, coklat, dan emas. Furnitur memiliki detail ornamen dan bentuk yang lebih kompleks. Penataan ruang cenderung simetris dan terstruktur.",
    colors:["#f5e6cc","#d4af37","#8b4513","#474130","#907b60"],
    img:"https://i.pinimg.com/736x/a2/df/df/a2dfdff59dcd92da010840a47e70dcb4.jpg"
  },
  Rustic:{
    desc: "Rustic menghadirkan nuansa alami dengan dominasi material kayu dan warna bumi. Tekstur terlihat lebih kasar dan natural. Furnitur sederhana namun kokoh. Tata ruang terasa hangat dan tidak terlalu formal.",
    colors:["#a0522d","#deb887","#f5deb3","#d9c89c","#7a301a"],
    img:"https://i.pinimg.com/736x/a2/41/17/a24117fbef80c3d0d55bb9287102fefb.jpg"
  },
  Korean:{
    desc: "Gaya Korean menampilkan ruang yang sederhana, bersih, dan soft. Warna dominan terang seperti putih dan pastel. Furnitur rendah dengan desain minimal. Tata ruang rapi dengan sedikit dekorasi yang fokus pada estetika lembut.",
    colors:["#f8f8f8","#eaeaea","#cfcfcf","#ec9c9d","#f1afc3"],
    img:"https://i.pinimg.com/736x/60/65/44/6065448a7872b62d6351967d500eaae7.jpg"
  },
 Luxury:{
  desc: "Interior luxury menonjolkan kemewahan melalui material premium seperti marmer, velvet, dan aksen emas. Warna kontras seperti hitam dan putih sering digunakan. Furnitur besar dan mencolok dengan penataan ruang yang luas dan terstruktur.",
  colors:["#000","#d4af37","#fff","#ddd5cd","#aa9f95"],
  img:"https://i.pinimg.com/736x/01/d5/5c/01d55c946013872439cee184de58d970.jpg"
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

// ================= COLOR PAGE =================
const colorContainer = document.getElementById("colorContainer");

if(colorContainer){
  Object.entries(styleData).forEach(([name,data])=>{
    const row=document.createElement("div");
    row.className="color-row";

    const title=document.createElement("h3");
    title.innerText=name;

    const list=document.createElement("div");
    list.className="color-list";

    data.colors.forEach(c=>{
      const box=document.createElement("div");
      box.className="color-box";
      box.style.background=c;
      list.appendChild(box);
    });

    row.appendChild(title);
    row.appendChild(list);
    colorContainer.appendChild(row);
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
    wrapper.style.zIndex = Date.now(); // 🔥 always on top

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

    // ===== DRAG =====
    wrapper.addEventListener("mousedown", (e)=>{
      if(e.target === resize || e.target === del) return;

      activeItem = wrapper;

      const rect = wrapper.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      wrapper.style.zIndex = Date.now(); // bring to front
    });

    // TOUCH START (HP)
    wrapper.addEventListener("touchstart", (e)=>{
      const touch = e.touches[0];

      activeItem = wrapper;

      const rect = wrapper.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

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

// ===== MOVE =====
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

    const grid = 10;

    x = Math.round(x / grid) * grid;
    y = Math.round(y / grid) * grid;

    activeItem.style.left = x + "px";
    activeItem.style.top = y + "px";
  }
});

// ===== RELEASE =====
document.addEventListener("mouseup", ()=>{
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

    img.onclick = ()=>{
      const w = window.open();
      w.document.write(`<img src="${src}" style="width:100%">`);
    };

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

window.downloadDesign = function(){
  const room = document.getElementById("room");

  if(!room){
    alert("Canvas tidak ditemukan!");
    return;
  }

  html2canvas(room).then(canvas=>{
    const link = document.createElement("a");
    link.download = "CasaVela-Design.png";
    link.href = canvas.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  // ===== TOUCH SUPPORT (HP FIX) =====
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
});

// RELEASE TOUCH
document.addEventListener("touchend", ()=>{
  activeItem = null;
  isResizing = false;
});
};
