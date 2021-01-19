
export default function () {
  return {
    token: localStorage.getItem('user-token') || '',
    status: '',
    isAuth: false
  }
}
