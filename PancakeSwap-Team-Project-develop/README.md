# PancakeSwap Team Project

Puoi vedere un anteprima del sito web visitando il seguente link:

#### [Vedi Anteprima](https://andreapossidente.github.io/PancakeSwap-Team-Project/)

# Worfklow
## SCRUM
1. Ad ogni inizio sprint (uno sprint ha una durata di una settimana), assegnamo i ticket dal backlog.
2. Creiamo un branch per ogni ticket (componente) utilizzando come nome il nome del ticket in camelCase.
3. Procediamo allo sviluppo del ticket.
4. Ogni giorno scriviamo sul gruppo discord qualche riga per aggiornare gli altri sullo sviluppo dei ticket ed, eventualmente, per chiedere aiuto su dubbi o problemi
5. Alla fine dello sprint tutti insieme facciamo lo sprint review: un momento in cui facciamo la review dei ticket per vedere se rispettano i criteri di completamento e ci confrontiamo su ciò che è andato bene e male nel corso della settimana.
6. Al termine dello sprint ricominciamo dal punto 1.

## SASS Architecture
1. Il codice scss è contenuto in diverse cartelle, ognuna con uno scopo preciso:
    1. abstracts: contiente codice sass con le variabili/funzioni generali che veranno usate in tutto il progetto
    2. components: contiente i moduli dei vari componenti della pagine
    3. layout: contiente il codice sass relativo al layout della pagina
    4. pages: contiente codice sass specifico per ogni pagina del website
2. Tutto il codice sass viene importato nel file main.scss
3. Il file css corrispondente al codice sass è presente nella cartella css sotto il nome main.css
4. Nel momento in cui si intenda creare o aggiornare codice, ciò che si dovrà fare sarà:
    1. eseguire il comando:
        ```
        sass --watch sass/main.scss css/main.css
        ```
    2. lavorare sul file o crearne uno nuovo
    3. Dato che tutto il codice scss è importato di default su main.scss nel momento in cui si salverà il file su cui si sta lavorando, automaticamente main.css verrà aggiornato
    4. Nel caso in cui si crei un nuovo file scss in una delle cartelle della directory, sarà necessario aggiornare il file _index.scss presente nella cartella inserendo il codice:
        ```
        @forward "nomeFileCreato.scss"
        ```
## Procedura push
## Naming conventions
