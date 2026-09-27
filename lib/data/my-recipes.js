// lib/data/my-recipes.js
// ⚠️ แยกจาก lib/data/recipes.js ของเช้าโดยตั้งใจ (Twist ข้อ 3)
//    recipes.js     = รายชื่อสูตรอาหารทั้งหมด — ข้อมูลอ้างอิง อ่านอย่างเดียว
//    my-recipes.js  = สูตรโปรดที่ผู้ใช้กดเพิ่มเอง — เขียนได้ ผูกกับการกระทำของผู้ใช้
//    คนละความหมาย คนละวงจรชีวิตข้อมูล จึงต้องคนละ array คนละไฟล์
import myRecipesData from "./my-recipes.json"

export let myRecipes = [...myRecipesData]   // copy ไว้ในหน่วยความจำ ไม่แตะไฟล์จริง
