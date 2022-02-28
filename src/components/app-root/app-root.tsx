import { Component, h } from '@stencil/core';
import blobStream, { IBlobStream } from 'blob-stream';
import PDFDocument from 'pdfkit';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <a href="#" onClick={() => this.showPDF()}>
            PDF
          </a>
        </main>
      </div>
    );
  }
  private showPDF() {
    let stream: IBlobStream = blobStream();
    const doc: PDFKit.PDFDocument = new PDFDocument();
    stream = doc.pipe(stream);
    doc.text('Hello world.');
    doc.end();
    stream.on('finish', function () {
      let pdfW = window.open('', 'PDF-Window'); //'PDF-Window');
      pdfW = window.open(stream.toBlobURL('application/pdf'), '_self'); //'PDF-Window');
      if (pdfW) {
        pdfW.focus();
      }
    });
  }
}
