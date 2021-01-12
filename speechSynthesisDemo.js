/*
 * SETUP
 */
checkBrowserSupport();
listenForVoicesUpdates();

// obtain inputs
const toBeSpokenInput = document.getElementById('to-be-spoken');
const voiceSelect = document.getElementById('voice-picker');
const volumeInput = document.getElementById('volume-picker');
const rateInput = document.getElementById('rate-picker');
const pitchInput = document.getElementById('pitch-picker');
const speakButton = document.getElementById('speak-button');

// event handler for 'speak button' click
speakButton.addEventListener('click', handleSpeakButtonClick);

/*
 * FUNCTIONS
 */
function checkBrowserSupport() {
    const supportMsg = document.getElementById('support-msg');

    if ('speechSynthesis' in window) {
        supportMsg.innerHTML = 'Tu navegador <strong>soporta</strong> speech synthesis.';
    } else {
        supportMsg.innerHTML = 'Lo siento tu navegador <strong>no soporta</strong> speech synthesis.';
        supportMsg.classList.add('not-supported');
    }
}

function listenForVoicesUpdates() {
    window.speechSynthesis.onvoiceschanged = function (e) {
        initializeVoiceSelectOptions();
    };
}

function initializeVoiceSelectOptions() {
    const voices = window.speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-picker');

    voices.forEach((voice) => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerHTML = voice.name;

        voiceSelect.appendChild(option);
    });
}

function getVoiceByName(name) {
    return speechSynthesis
        .getVoices()
        .find((voice) => {
            return voice.name == name;
        });
}

function handleSpeakButtonClick(event) {
    if (toBeSpokenInput.value.length > 0) {
        speak(toBeSpokenInput.value);
    }
}

function speak(text) {
    // Cancel any previous attempts
    window.speechSynthesis.cancel();

    var msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.volume = volumeInput.value;
    msg.rate = rateInput.value;
    msg.pitch = pitchInput.value;
    msg.voice = getVoiceByName(voiceSelect.value);

    // Queue this message.
    window.speechSynthesis.speak(msg);
}

