import { Component, inject, signal } from '@angular/core';
import { GeminiService } from '../../core/services/gemini';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia-demo.html',
  styleUrls: ['./ia-demo.scss']
})
export class IaDemoComponent {
  protected gemini = inject(GeminiService);

  // Signal para el efecto de escritura
  textoEscribiendose = signal<string>('');

  copiado = signal<boolean>(false);

  // Lista de sugerencias para el portafolio
  sugerencias = [
    { etiqueta: '🚀 Angular 19', prompt: 'Háblame de las novedades de Angular 19' },
    { etiqueta: '⚛️ RxJS', prompt: '¿Para qué sirve RxJS en este proyecto?' },
    { etiqueta: '👨‍💻 Sobre Luis', prompt: 'Cuéntame sobre la experiencia de Luis como desarrollador' }
  ];

  async copiarAlPortapapeles() {
    const texto = this.textoEscribiendose();
    if (!texto) return;

    try {
      await navigator.clipboard.writeText(texto);

      // Feedback visual
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 2000); // Reset tras 2 seg
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  }

  async preguntar(prompt: string) {
    this.textoEscribiendose.set(''); // Limpiar antes de empezar
    await this.gemini.generarRespuesta(prompt);

    // Al recibir la respuesta del mock, la escribimos letra por letra
    const respuestaCompleta = this.gemini.respuestaIA();
    let i = 0;

    const intervalo = setInterval(() => {
      this.textoEscribiendose.update(val => val + respuestaCompleta[i]);
      i++;
      if (i === respuestaCompleta.length) clearInterval(intervalo);
    }, 30); // Velocidad de escritura (30ms por letra)
  }

  // Función para disparar la pregunta desde un chip
  usarSugerencia(prompt: string) {
    this.preguntar(prompt);
  }
}
