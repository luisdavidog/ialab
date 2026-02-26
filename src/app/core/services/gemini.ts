import { Injectable, signal } from '@angular/core';
import { MOCK_RESPONSES } from '../mocks/gemini-responses';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  public respuestaIA = signal<string>('');
  public cargando = signal<boolean>(false);

  async generarRespuesta(prompt: string) {
    this.cargando.set(true);
    this.respuestaIA.set('');

    // Simulamos latencia de red (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const query = prompt.toLowerCase();

    // Lógica de búsqueda simple en el Mock
    let respuesta = MOCK_RESPONSES['default'];

    if (query.includes('angular')) respuesta = MOCK_RESPONSES['angular'];
    else if (query.includes('rxjs')) respuesta = MOCK_RESPONSES['rxjs'];
    else if (query.includes('luis') || query.includes('quién')) respuesta = MOCK_RESPONSES['experiencia'];

    this.respuestaIA.set(respuesta);
    this.cargando.set(false);
  }
}
