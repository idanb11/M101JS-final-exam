db.messages.find({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"})
db.messages.update({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"}, {$addToSet: {"headers.To": "mrpotatohead@mongodb.com"}})
db.messages.find({"headers.Message-ID": "<8147308.1075851042335.JavaMail.evans@thyme>"})