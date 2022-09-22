import './Profile.css';

function Profile() {
    return (
        <main className='profile'>
            <h2 className='profile__title'>Привет, Галина!</h2>
            <form className='profile-form'>
                <label className='profile-form__label'>
                Имя
                <input className='profile-form__input'type="text" name="name" value="Галина"></input>
                </label>
                <label className='profile-form__label'>
                E-mail
                <input className='profile-form__input' type="text" name="email" value="pochta@yandex.ru"></input>
                </label>
                <button className='profile-form__button'>Редактировать</button>
            </form>
            <p className='profile-form__logout'>Выйти из аккаунта</p>
        </main>
    )
}

export default Profile;
