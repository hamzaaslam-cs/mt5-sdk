class Users {
  constructor(instance) {
    this.instance = instance;
  }

  get(login) {
    return new Promise((resolve, rejects) => {
      const callback = (error) => {
        if (error) {
          rejects(error);
        }
        this.instance.http.get(
          `/api/user/get?login=${login}`,
          (error, res, body) => {
            if (error) {
              console.log(error);
              rejects(error);
            }
            const answer = this.instance.http.parseBodyJSON(error, res, body);
            resolve(answer ? answer?.answer : answer);
          }
        );
      };
      return this.instance.auth.auth(callback);
    });
  }

  create(user) {
    return new Promise((resolve, rejects) => {
      const callback = (error) => {
        if (error) {
          rejects(error);
        }
        this.instance.http.post(
          `/api/user/add`,
          JSON.stringify(user),
          (error, res, body) => {
            if (error) {
              console.log(error);
              rejects(error);
            }
            const answer = this.instance.http.parseBodyJSON(error, res, body);
            resolve(answer ? answer?.answer : answer);
          }
        );
      };
      return this.instance.auth.auth(callback);
    });
  }

  checkPassword(login, password, type = "main") {
    return new Promise((resolve, rejects) => {
      const callback = (error) => {
        if (error) {
          rejects(error);
        }
        this.instance.http.get(
          encodeURI(
            `/api/user/check_password?login=${login}&type=${type}&password=${password}`
          ),
          (error, res, body) => {
            if (error) {
              console.log(error);
              rejects(error);
            }
            const answer = this.instance.http.parseBodyJSON(error, res, body);
            resolve(answer?.retcode === "0 Done" ? true : false);
          }
        );
      };
      return this.instance.auth.auth(callback);
    });
  }

  changePassword(login, currentPassword, newPassword, type = "main") {
    return this.checkPassword(login, currentPassword)
      .then((value) => {
        if (value === true) {
          return new Promise((resolve, reject) => {
            const callback = (error) => {
              if (error) {
                rejects(error);
              }
              this.instance.http.get(
                encodeURI(
                  `/api/user/change_password?login=${login}&type=${type}&password=${newPassword}`
                ),
                (error, res, body) => {
                  if (error) {
                    console.log(error);
                    rejects(error);
                  }
                  const answer = this.instance.http.parseBodyJSON(
                    error,
                    res,
                    body
                  );
                  resolve(answer?.retcode === "0 Done" ? true : false);
                }
              );
            };
            return this.instance.auth.auth(callback);
          });
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  getBatch(group) {
    return new Promise((resolve, rejects) => {
      const callback = (error) => {
        if (error) {
          rejects(error);
        }
        this.instance.http.get(
          encodeURI(`/api/user/get_batch?group=${group}`),
          (error, res, body) => {
            if (error) {
              console.log(error);
              rejects(error);
            }
            const answer = this.instance.http.parseBodyJSON(error, res, body);
            resolve(answer?.retcode === "0 Done" ? answer : null);
          }
        );
      };
      return this.instance.auth.auth(callback);
    });
  }
}

module.exports = Users;
