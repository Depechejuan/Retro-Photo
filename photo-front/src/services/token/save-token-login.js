function saveTokenLogin(response) {
    console.log(response);
    const token = response.token.token;
    localStorage.setItem("WED_TOKEN", token);
}
export default saveTokenLogin;
