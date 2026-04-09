// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Document {}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // Usamos el nuevo inject() de Angular moderno
  private http = inject(HttpClient);
  
  // La URL de tu API en Laragon
  private apiUrl = 'http://api-mecanografia.test/api/documents';

  constructor() { }

  // 1. Obtener lista de libros
  getDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 2. Subir un nuevo libro (PDF o TXT)
  uploadDocument(title: string, file: File): Observable<any> {
    // Para enviar archivos, obligatoriamente debemos usar FormData, igual que hicimos en Bruno
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData);
  }

  // 3. Obtener el contenido de un libro para practicar
  getDocumentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 4. Eliminar un libro
  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}