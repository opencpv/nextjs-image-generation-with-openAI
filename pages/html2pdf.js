import { useState } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { pdfFromReact } from "generate-pdf-from-react-html";

const HTML2pdf = () => {
  const [html, setHtml] = useState("");

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
