import jsPDF from "jspdf";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

const HTML2pdf = () => {
  const [html, setHtml] = useState("");

  const pdfFromReact = (target, name, orientation, resize, debug) => {
    if (resize) {
      document.querySelector(target).style.width =
        orientation === "p" ? "600px" : "841px";
      document.querySelector(target).style.minHeight =
        orientation === "p" ? "841px" : "595px";
    }
    let pdf = new jsPDF(orientation, "pt", "a4");
    pdf.html(document.querySelector(target), {
      callback: () => {
        debug ? window.open(pdf.output("bloburl")) : pdf.save(`${name}.pdf`);
        if (resize) {
          document.querySelector(target).style = "";
        }
      },
    });
  };
  return (
    <main className=" py-8 px-8 grid grid-cols-2">
      <section>
        <textarea
          placeholder="enter html text"
          className="flex h-[60vh] rounded-md w-full p-4 border border-gray-400 outline-none text-gray-400"
          onChange={(e) => {
            setHtml(e.target.value);
          }}
        />
        <button
          className="w-full bg-blue-400 text-white font-bold py-2 my-2 rounded-md"
          onClick={() => {
            pdfFromReact(".element-to-print", "My-file", "p", true, false);
          }}
        >
          Download PDF
        </button>
      </section>

      <section className="w-full p-4 ">
        <div className="element-to-print">{ReactHtmlParser(html)}</div>
      </section>
    </main>
  );
};

export default HTML2pdf;
