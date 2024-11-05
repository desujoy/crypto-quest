export function authUserToNameRegno(sessionUserName: string) {
  const userData = sessionUserName.split(" ");
  return {
    userRegNo: userData[userData.length - 1],
    userName: userData
      .slice(0, userData.length - 1)
      .join(" ")
      .toUpperCase(),
  };
}
