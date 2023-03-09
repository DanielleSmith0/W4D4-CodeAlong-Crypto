const bcrypt = require("bcryptjs");
let chats = []

module.exports = {
    createMessage: (req, res) => {
        console.log(req.body);
        const {pin, message} = req.body;

        //we want to check if pins are the same, so we can display multiple messages at once with same pin.
        for(let i = 0; i < chats.length; i++) {
            const existingPin = bcrypt.compareSync(pin, chats[i].pinHash)
                if(existingPin){
                    chats[i].message.push(message) //I'm adding the message to the object with the same pin.
                    let messageToReturn = {...chats[i]};
                    delete messageToReturn.pinHash;
                    return res.status(200).send(messageToReturn);
                }
            }
        }

    ]
    
        const salt = bcrypt.genSaltSync(5);
        const pinHash = bcrypt.hashSync(pin, salt);

        console.log(pin);
        console.log(salt);
        console.log(pinHash);

        let msgObj = {
            pinHash,
            messages: [message]
        }

        chats.push(msgObj);

        let secureMessage = {...msgObj}
        delete secureMessage.pinHash

        res.status(200).send(secureMessage);
    }
};
