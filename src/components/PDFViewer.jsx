import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer(props) {
  const newPlugin = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
      <Viewer
        fileUrl={props.document}
        plugins={[newPlugin]}
        defaultScale={props.scale}
        theme="dark"
      />
    </Worker>
  );
}

export default PDFViewer;
