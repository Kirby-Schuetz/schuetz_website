import { Document, Page } from 'react-pdf';
import React from 'react';
import { pdfjs } from 'react-pdf';
import schuetzResume from '../../assets/schuetzResume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function ModalContent() {
    return (
        <div>
          <h2>Contact</h2>
          <p>LinkedIn: 
            <a href="https://www.linkedin.com/kirby-schuetz"> linkedin.com/in/kirby-schuetz/</a>
          </p>
          <p>GitHub: 
            <a href="https://github.com/Kirby-Schuetz"> github.com/Kirby-Schuetz</a>
          </p>
          <Document
            file={ schuetzResume }
            >
            <Page             
            pageNumber={1} 
            style={{ width: '100%', height: 'auto' }}/>
          </Document>
          {/* <div>
    <PDFDownloadLink document={schuetzResume} fileName="schuetzResume.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div> */}
        </div>
        
    );
}