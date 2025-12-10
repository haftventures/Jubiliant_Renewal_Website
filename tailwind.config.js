// tailwind.config.js
module.exports = {
  content: [
    // 1. Scans ALL EJS files in your 'views' folder (The path set in app.js)
    "./views/**/*.ejs",  
    
    // 2. Scans ALL HTML/HTM files in the root folder (e.g., aboutus.htm, kyc.htm)
    "./*.{html,htm}",
    
    // 3. Scans ALL HTML/HTM files inside the public folder
    "./public/**/*.{html,htm}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}