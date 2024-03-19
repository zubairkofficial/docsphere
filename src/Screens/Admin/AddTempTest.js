import { useEffect, useState } from "react";

const AddTempTest = () => {
  const data = {
    name: "Zubair Khan",
    title: "Full Stack Developer",
    skills: {
      data: ["Laravel", "MERN", "OpenAI", "AI Chatbots"],
      htmlTag: "li",
    },
    experience: [
      {
        company: "Cyberify",
        start: 2021,
        end: "Present",
        role: "Open AI Developer",
        htmlContent: `<div>
                <h1>{company}</h1>
                <p>{role}</p>
                <small>{start} - {end}</small>
            </div>`,
      },
      {
        company: "IMS",
        start: 2019,
        end: 2021,
        role: "Full Stack Developer",
        htmlContent: `<div>
                <h1>{company}</h1>
                <p>{role}</p>
                <small>{start} - {end}</small>
            </div>`,
      },
    ],
  };

  const htmlContent = `<div>
        <h1>{name}</h1>
        <p>{title}</p>
        <hr />
        <ul>{skills}</ul>
        <hr />
        <div>{experience}</div>
    </div>`;

  const [content, setContent] = useState("<div></div>");
  const [con, setCon] = useState("");
  const [allKeys, setAllKeys] = useState([]);

  const isObject = (value) => {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  };

  const contentReplace = (keys, object) => {
    let orgData = object.htmlContent;
    keys.forEach((key) => {
      let updated = orgData.replace(`{${key}}`, object[key]);
      orgData = updated;
    });

    return orgData;
  };

  const parseContent = () => {
    let orgContent = htmlContent;
    // let key = "name";
    // let updated = orgContent.replace(`{${key}}`, "Zubair");
    // console.log(updated)
    Object.entries(data).forEach(([key, value]) => {
      // console.log(key, value);
      if (isObject(value)) {
        if (Array.isArray(value.data)) {
          let arrayHtml = "";
          value.data.forEach((singleValue) => {
            if (isObject(singleValue)) {
            } else {
              arrayHtml += `<${value.htmlTag}>${singleValue}</${value.htmlTag}>`;
            }
          });
          let updatedString = orgContent.replace(`{${key}}`, arrayHtml);
          orgContent = updatedString;
        } else {
        }
        // console.log(key, "is Array");
        //     console.log(key, "Is Array");
        //     orgContent.replace(`{${key}}`, value);
      } else if (Array.isArray(value)) {
        let totalContent = "";
        value.forEach((singleValue) => {
          totalContent += contentReplace(Object.keys(singleValue), singleValue);
        });
        let updatedString = orgContent.replace(`{${key}}`, totalContent);
        orgContent = updatedString;
      } else {
        let updatedString = orgContent.replace(`{${key}}`, value);
        orgContent = updatedString;
      }
    });

    console.log(orgContent);

    // return orgContent;
    setContent(orgContent);

    // let testString = "Something is {name}";
    // let key = "name";
    // let updated = testString.replace(`{${key}}`, "Updated");
    // console.log(updated);
  };

  const updateValue = (e) => {
    setCon(e.target.value);
    fetchKeys(e.target.value);
  };

  const fetchKeys = (string) => {
    const keyPattern = /\{([^}]+)\}/g;
    const keys = [];

    let match;
    while ((match = keyPattern.exec(string)) !== null) {
      keys.push({ key: match[1], type: "string" });
    }

    setAllKeys(keys);
  };

  useEffect(() => {
    parseContent();
  }, []);

  return (
    // <div></div>
    // <div dangerouslySetInnerHTML={{ __html: content }}></div>
    <div className="container row mt-4">
      <div className="col-5">
        <textarea
          className="form-control"
          rows="25"
          value={con}
          onChange={updateValue}
        />
      </div>

      <div className="col-3">
        <ul className=" mx-auto">
          {allKeys.map((key) => (
            <li key={key.key}>
              {key.key} -
              <select name="" id="">
                <option value="string" selected={key.type === "string"}>
                  string
                </option>
                <option value="array" selected={key.type === "array"}>
                  array
                </option>
                <option value="object" selected={key.type === "object"}>
                  object
                </option>
              </select>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-4">
        <div dangerouslySetInnerHTML={{ __html: con }}></div>
      </div>
    </div>
  );
};

export default AddTempTest;
