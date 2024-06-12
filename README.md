# Projeto de Videoconferência com Múltiplos Provedores

Este projeto é uma implementação avançada de um sistema de videoconferência que utiliza princípios de SOLID e programação orientada a objetos (POO) para suportar múltiplos provedores de serviços de vídeo. Os provedores incluídos são Agora, Zoom e um provedor fictício chamado Alevideo. A arquitetura foi cuidadosamente projetada para garantir flexibilidade, manutenção e escalabilidade, utilizando padrões de design como Factory, Strategy e Dependency Injection.

<img src="https://github.com/charleston10/nextjs-poo-video-abstraction-solid/assets/3097207/8d33e95c-a778-4dc2-b341-db1825e158d0" alt="image" width="400" height="300"/>


## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```plaintext
src/
└── modules/
    └── videconference/
        ├── factory-provider.ts
        ├── features.ts
        ├── videoconference.provider.ts
        ├── videoconference.ts
        ├── videoconference-impl.ts
        └── providers/
            ├── agora.ts
            ├── alevideo.ts
            ├── index.ts
            └── zoom.ts
```

## Análise de Padrões de Design Utilizados

### Arquivo: `factory-provider.ts`

#### Padrão Utilizado: Factory Pattern

O padrão Factory é utilizado para encapsular a lógica de criação dos provedores de videoconferência. Isso permite que o sistema decida qual provedor instanciar em tempo de execução com base em um parâmetro fornecido.

```typescript
import { Agora, Zoom } from "@/modules/videconference/providers";
import { Alevideo } from "@/modules/videconference/providers/alevideo";

export function factoryProvider(providerName: string) {
  switch (providerName) {
    case "agora":
      return new Agora();
    case "zoom":
      return new Zoom();
    case "alevideo":
      return new Alevideo();
    default:
      return new Agora();
  }
}
```

#### Explicação
- **Factory Pattern**: Este padrão cria objetos sem expor a lógica de criação ao cliente. Em vez disso, usa uma função para criar e retornar a instância apropriada baseada no nome do provedor.

### Arquivo: `features.ts`

#### Padrão Utilizado: Constant Definitions

Este arquivo define constantes que representam as funcionalidades suportadas pelos provedores de videoconferência. Isso melhora a legibilidade e a manutenção do código.

```typescript
export const FEATURE_VIDEO = "video";
export const FEATURE_SOUND = "sound";
export const FEATURE_RECORD_SOUND = "record_sound";
export const FEATURE_CALL = "call";
```

#### Explicação
- **Constant Definitions**: Definir constantes centralizadas evita valores "mágicos" e facilita a alteração ou adição de novas funcionalidades no futuro.

### Arquivo: `videoconference.provider.ts`

#### Padrão Utilizado: Template Method Pattern (Classe Abstrata)

Define uma classe abstrata `VideoConferenceProvider` que declara métodos abstratos. As subclasses concretas devem implementar esses métodos.

```typescript
export abstract class VideoConferenceProvider {
  abstract name: string;

  abstract video(value: boolean): void;

  abstract sound(value: boolean): void;

  abstract call(value: boolean): void;

  abstract recordSound(value: boolean): void;

  abstract features(): string[];
}
```

#### Explicação
- **Template Method Pattern**: A classe abstrata fornece um esqueleto de algoritmo com métodos abstratos que devem ser implementados pelas subclasses, garantindo um contrato uniforme para todas as implementações de provedores.

### Arquivo: `videoconference.ts`

#### Padrão Utilizado: Interface

Define uma interface `Videoconference` que lista os métodos que qualquer implementação de videoconferência deve ter.

```typescript
export interface Videoconference {
  sound(value: boolean): void;
  video(value: boolean): void;
  call(value: boolean): void;
  recordSound(value: boolean): void;
  getFeatures(): string[];
  getName(): string;
  hasFeature(name: string): boolean;
  hasFeatureVideo(): boolean;
  hasFeatureSound(): boolean;
  hasFeatureRecordSound(): boolean;
  hasFeatureCall(): boolean;
}
```

#### Explicação
- **Interface**: Define um contrato que todas as classes concretas devem seguir, promovendo a consistência e a possibilidade de múltiplas implementações.

### Arquivo: `videoconference-impl.ts`

#### Padrão Utilizado: Facade Pattern

Implementa a lógica da videoconferência utilizando os provedores concretos. Este arquivo age como uma fachada simplificando a interação com múltiplos provedores de videoconferência.

```typescript
import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import { factoryProvider } from "@/modules/videconference/factory-provider";
import {
  FEATURE_CALL,
  FEATURE_RECORD_SOUND,
  FEATURE_SOUND,
  FEATURE_VIDEO,
} from "@/modules/videconference/features";
import { Videoconference } from "@/modules/videconference/videoconference";

export class VideoConferenceImpl implements Videoconference {
  private provider: VideoConferenceProvider;

  constructor(providerName: string) {
    this.provider = factoryProvider(providerName);
  }

  sound(value: boolean): void {
    this.provider.sound(value);
  }

  video(value: boolean): void {
    this.provider.video(value);
  }

  call(value: boolean): void {
    this.provider.call(value);
  }

  recordSound(value: boolean): void {
    this.provider.recordSound(value);
  }

  getFeatures(): string[] {
    return this.provider.features();
  }

  getName(): string {
    return this.provider.name;
  }

  hasFeature(name: string): boolean {
    return this.getFeatures().includes(name);
  }

  hasFeatureVideo(): boolean {
    return this.hasFeature(FEATURE_VIDEO);
  }

  hasFeatureSound(): boolean {
    return this.hasFeature(FEATURE_SOUND);
  }

  hasFeatureRecordSound(): boolean {
    return this.hasFeature(FEATURE_RECORD_SOUND);
  }

  hasFeatureCall(): boolean {
    return this.hasFeature(FEATURE_CALL);
  }
}
```

#### Explicação
- **Facade Pattern**: Este padrão fornece uma interface simplificada para um subsistema complexo. A classe `VideoConferenceImpl` age como uma fachada que expõe uma interface unificada para interagir com diferentes provedores de videoconferência.

### Arquivo: `providers/agora.ts`

#### Padrão Utilizado: Strategy Pattern (Implementação Concreta)

Implementa o provedor Agora de acordo com a classe abstrata `VideoConferenceProvider`.

```typescript
import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import { FEATURE_CALL, FEATURE_SOUND, FEATURE_VIDEO } from "@/modules/videconference/features";

export class Agora extends VideoConferenceProvider {
  name: string = "Agora Provider";
  private _isSound: boolean = false;
  private _isVideo: boolean = false;
  private _isCall: boolean = false;

  video(value: boolean): void {
    this._isVideo = value;
  }

  sound(value: boolean): void {
    this._isSound = value;
  }

  call(value: boolean): void {
    this._isCall = value;
  }

  recordSound(value: boolean): void {
    throw new Error("Not supported record sound");
  }

  features(): string[] {
    return [FEATURE_VIDEO, FEATURE_SOUND, FEATURE_CALL];
  }
}
```

#### Explicação
- **Strategy Pattern**: Cada provedor (Agora, Zoom, Alevideo) é uma implementação concreta da estratégia definida pela classe `VideoConferenceProvider`. Isso permite que o comportamento de cada provedor possa ser alterado independentemente.

### Arquivo: `providers/alevideo.ts`

#### Padrão Utilizado: Strategy Pattern (Implementação Concreta)

Implementa o provedor Alevideo de acordo com a classe abstrata `VideoConferenceProvider`.

```typescript
import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import { FEATURE_CALL, FEATURE_VIDEO } from "@/modules/videconference/features";

export class Alevideo extends VideoConferenceProvider {
  name: string = "Alevideo Provider";

  private _isSound: boolean = false;
  private _isVideo: boolean = false;
  private _isCall: boolean = false;

  video(value: boolean): void {
    this._isVideo = value;
  }

  sound(value: boolean): void {
    if (value) {
      this.soundOn();
    } else {
      this.soundOff();
    }
  }

  call(value: boolean): void {
    this._isCall = value;
  }

  recordSound(value: boolean): void {
    throw new Error("Not supported record sound");
  }

  features(): string[] {
    return [FEATURE_VIDEO, FEATURE_CALL];
  }

  private soundOn() {
    this._isSound = true;
  }

  private soundOff() {
    this._isSound = false;
  }
}
```

#### Explicação
- **Strategy Pattern**: Similar ao provedor Agora, a implementação do Alevideo segue a mesma estratégia, garantindo que todos os provedores possam ser intercambiáveis através da interface comum `VideoConferenceProvider`.

### Arquivo: `providers/index.ts`

#### Padrão Utilizado: Module Pattern

Reexporta os módulos dos provedores para facilitar a importação em outras partes do código.

```typescript
export * from "./agora";
export * from "./zoom";
```

#### Explicação
- **Module Pattern**: Organiza e encapsula os módulos de provedores em um único ponto de exportação, melhorando a organização e a manutenção do código.

### Arquivo: `providers/zoom

.ts`

#### Padrão Utilizado: Strategy Pattern (Implementação Concreta)

Implementa o provedor Zoom de acordo com a classe abstrata `VideoConferenceProvider`.

```typescript
import { VideoConferenceProvider } from "@/modules/videconference/videoconference.provider";
import {
  FEATURE_CALL,
  FEATURE_RECORD_SOUND,
  FEATURE_SOUND,
  FEATURE_VIDEO,
} from "@/modules/videconference/features";

export class Zoom extends VideoConferenceProvider {
  name: string = "Zoom Provider";

  private _isSound: boolean = false;
  private _isVideo: boolean = false;
  private _isCall: boolean = false;

  video(value: boolean): void {
    this._isVideo = value;
  }

  sound(value: boolean): void {
    if (value) {
      this.soundOn();
    } else {
      this.soundOff();
    }
  }

  call(value: boolean): void {
    this._isCall = value;
  }

  recordSound(value: boolean): void {
    throw new Error("Not supported record sound");
  }

  features(): string[] {
    return [FEATURE_VIDEO, FEATURE_SOUND, FEATURE_CALL];
  }

  private soundOn() {
    this._isSound = true;
  }

  private soundOff() {
    this._isSound = false;
  }
}
```

#### Explicação
- **Strategy Pattern**: Segue o mesmo padrão que os outros provedores, permitindo a intercambialidade através da interface comum `VideoConferenceProvider`.

## Conclusão

Este projeto demonstra uma implementação robusta e flexível de um sistema de videoconferência utilizando princípios de SOLID e POO. A arquitetura permite a fácil adição de novos provedores e a manutenção do código existente, garantindo escalabilidade e modularidade. Os padrões de design como Factory, Strategy e Facade, juntamente com a injeção de dependências, asseguram que o sistema seja extensível e de fácil manutenção.
