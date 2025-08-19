function getChatTypes() {
    const uppercase = document.querySelector('#include-uppercase').checked;
    const lowercase = document.querySelector('#include-lowercase').checked;
    const number = document.querySelector('#include-number').checked;
    const specialCharacter = document.querySelector('#include-special-character').checked;

    const charTypes = [];

    if (uppercase) charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (lowercase) charTypes.push('abcdefghijklmnopqrstuvwxyz');
    if (number) charTypes.push('1234567890');
    if (specialCharacter) charTypes.push('!@#$%&**()_-+=><:;".,~\'^?\\/ ');

    return charTypes;
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size, charTypes) {
    let passwordGenerated = [];

    charTypes.forEach(type => {
        const randomChar = type[Math.floor(Math.random() * type.length)];
        passwordGenerated.push(randomChar);
    });

    while (passwordGenerated.length < size) {
        passwordGenerated.push(randomCharType(charTypes));
    }

    for (let i = passwordGenerated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordGenerated[i], passwordGenerated[j]] = [passwordGenerated[j], passwordGenerated[i]];
    }

    return passwordGenerated.join('');
}

function message(text, background) {
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}

const sizeSelect = document.querySelector('#size-select');

document.querySelector('#generate').addEventListener('click', function () {
    const size = parseInt(sizeSelect.value);
    const charTypes = getChatTypes();

    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', '#dc2626');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password-container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function() {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', '#7c3aed');
});
