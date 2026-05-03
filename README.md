# MID Visualizer

Visualizador web estatico para arquivos `.mid` e `.midi`.

## Como usar

1. Abra `index.html` no navegador.
2. Clique em `Abrir MIDI` e escolha um arquivo `.mid`.
3. Use `Tocar`, `Pausar`, `Reiniciar`, a barra de progresso e o controle de velocidade.

O app faz o parse do arquivo localmente no navegador, desenha as notas em piano roll e usa Web Audio para uma reproducao sintetizada simples.

A aba `Biblioteca`, na lateral direita, permite escolher uma pasta com arquivos `.mid/.midi`, filtrar a lista e carregar musicas com um clique. Ela fica sobreposta e recolhivel, sem mudar as proporcoes do visualizador.

O visualizador tem dois modos:

- `Notas caindo`: notas descem ate o teclado, pensado para gravar e usar como overlay em video.
- `Piano roll`: linha do tempo horizontal tradicional.

No modo `Notas caindo`, o controle `Queda` ajusta quantos segundos antes da nota ela aparece na tela. Valores maiores dao mais antecipacao visual.

O painel `Aparencia` permite ajustar fundo, cores das notas, grade, linha de impacto, formato, brilho, rastro, particulas e reflexo das notas caindo.

As configuracoes do visualizador ficam salvas no `localStorage` do navegador, incluindo modo, velocidade, delays e aparencia. O painel tambem tem presets rapidos: `Neon`, `Crystal`, `Minimal` e `Warm`. Para guardar um estilo proprio, digite um nome em `Nome do preset` e clique em `Salvar aparencia`; presets salvos aparecem no grupo `Salvos` e podem ser excluidos.

O seletor `Timbre` troca o som sintetizado no navegador. Opcoes atuais: `Piano suave`, `Piano claro`, `Bell`, `Organ`, `Pluck`, `Pad` e `Chip`.

Use `Visual only (sem som)` no seletor `Timbre` para desativar o audio e deixar o visualizador mais leve para gravacao.

O sintetizador usa uma cadeia master unica e agenda o audio em janelas curtas para reduzir travadas em MIDIs com muitas notas.

Para sincronizar manualmente com o macro, use `Delay inicial` no navegador com o mesmo valor do `Delay foco` do MID to Keymap. Atalhos do navegador enquanto a pagina estiver focada:

- `F8`: iniciar com delay
- `F9`: pausar/retomar
- `F10`: parar e resetar
- `F11`: reiniciar com delay

## Observacoes

- Arquivos MIDI com divisao PPQ sao suportados.
- Arquivos com divisao SMPTE mostram uma mensagem de erro.
- A reproducao nao usa soundfonts; ela sintetiza ondas simples para facilitar o uso sem dependencias externas.
