export function authUserToNameRegno(sessionUserName: string) {
  const userData = sessionUserName.split(" ");
  return {
    userName: userData[userData.length - 1],
    userRegNo: userData
      .slice(0, userData.length - 1)
      .join(" ")
      .toUpperCase(),
  };
}
