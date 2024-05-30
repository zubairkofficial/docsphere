import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  
  static localhost = "127.0.0.1:8000";
  static server = "docsphere.cyberifyportfolio.com";
  static basePath = `//${this.localhost}`;
  static apiUrl = `${this.basePath}/api/`;
  static googleUrl = `${this.basePath}/`;

  static authUser = JSON.parse(localStorage.getItem("user")) ?? {};
  static serverImage = (name) => {
    return `${this.basePath}/uploads/${name}`;
  };
  
  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  
  static getItem = (data, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
    }
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };

  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 2000,
    });
  };
  static chatApiKey = "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";
  static sbUrl = 'https://viekdgdthevphwbclorz.supabase.co';
  static sbApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZWtkZ2R0aGV2cGh3YmNsb3J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjM3MTc4NiwiZXhwIjoyMDMxOTQ3Nzg2fQ.9Yv-S6qUjfPj3Y-4TiuguYHC_EPH7AOoAIdSzec97bQ';
  
  static toggleCSS() {
    const path = window.location.pathname;

    const mainCSS = document.getElementsByClassName("main-theme");
    const dashboardCSS = document.getElementsByClassName("dashboard-theme");

    // Preload stylesheets to avoid FOUC
    const preloadStyles = (styles) => {
        styles.forEach(style => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.href = style.href;
            link.as = "style";
            document.head.appendChild(link);
        });
    };

    if (path.includes("/user") || path.includes("/admin")) {
        preloadStyles(Array.from(dashboardCSS));
        // Disable main theme and enable dashboard theme
        setTimeout(() => {
            for (let i = 0; i < mainCSS.length; i++) {
                mainCSS[i].setAttribute("disabled", "true");
            }
            for (let i = 0; i < dashboardCSS.length; i++) {
                dashboardCSS[i].removeAttribute("disabled");
            }
        }, 0);
    } else {
        preloadStyles(Array.from(mainCSS));
        // Enable main theme and disable dashboard theme
        setTimeout(() => {
            for (let i = 0; i < mainCSS.length; i++) {
                mainCSS[i].removeAttribute("disabled");
            }
            for (let i = 0; i < dashboardCSS.length; i++) {
                dashboardCSS[i].setAttribute("disabled", "true");
            }
        }, 0);
    }
}


  static loadScript(scriptName, dashboard = false) {
    return new Promise((resolve, reject) => {
      const scriptPath = `/${
        dashboard ? "dashboard" : "assets"
      }/js/${scriptName}`;
      const script = document.createElement("script");
      script.src = scriptPath;
      script.async = true;

      script.onload = () => resolve(script); // Resolve the promise once the script is loaded
      script.onerror = () =>
        reject(new Error(`Script load error: ${scriptPath}`));

      document.body.appendChild(script);
    });
  }

  static encryptObject = (obj) => {
    const str = JSON.stringify(obj);
    const encrypted = btoa(str);
    return encrypted;
  };

  static decryptObject = (str) => {
    const decrypted = atob(str);
    const obj = JSON.parse(decrypted);
    return obj;
  };

  static encryptString = (str) => {
    const encrypted = btoa(str);
    return encrypted;
  };

  static decryptString = (str) => {
    try {
      const decrypted = atob(str);
      return decrypted;
    } catch (error) {
      return "";
    }
  };

  static paginate = (data) => {
    let pageSize = 10;
    let paginated = [];
    let startIndex = 0;
    let totalPages = Math.ceil(data.length / pageSize);
    for (let i = 0; i < totalPages; i++) {
      let lastIndex = pageSize + startIndex;
      let pageData = data.slice(startIndex, lastIndex);
      paginated.push(pageData);
      startIndex += pageSize;
    }
    return paginated;
  };

  static getContentValue = (dataString) => {
    try {
      let data = JSON.parse(dataString);
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].delta.content;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  };

  static countWords = (str) => {
    if (str) {
      let words = str.split(" ");
      return words.length;
    } else {
      return 0;
    }
  };
}

export default Helpers;
