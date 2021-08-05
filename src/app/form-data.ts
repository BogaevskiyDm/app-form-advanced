export const FORM_LABLES = {
    name: 'Логин',
    password: 'Пароль',
    email: 'Email',
    role: 'Роль',
    age: 'Возраст'
}

export const FORM_PLACEHOLDERS = {
    name: 'Введите логин...',
    password: 'Введите Пароль...',
    email: 'Укажите адрес электронной почты...',
    age: 'Установите возраст...',
    role: 'Выберите роль...'
}

export const FORM_SUCCESS = {
    name: 'Принято',
    password: 'Принято',
    email: 'Принято',
    role: 'Принято',
    age: 'Принято'
}

export const FORM_ERRORS = {
    name: '',
    password: '',
    email: '',
    role: '',
    age: ''
};

export const VALIDATION_MESSENGES = {
    name: {
        required: 'Имя обязательно',
        minlength: 'Имя должно cодержать минимум 4 символа',
        maxlength: 'Имя должно cодержать максимум 15 символов'
    },

    password: {
        required: 'Пароль обязателен',
        minlength: 'Пароль должен cодержать минимум 7 символов',
        maxlength: 'Пароль должун cодержать максимум 25 символа'
    },
    email: {
        required: 'Email обязателен',
        emailValidator: 'Неправильный формат Email адреса'
    },
    age: {
        required: 'Возраст обязателен',
        rangeValidator: 'Значение должно быть числом в диапазоне 18..122'
    },

    role: {
        required: 'Обязательное поле'
    }
}

export const FORM_ROLES = ['Гость', 'Модератор', 'Администратор']