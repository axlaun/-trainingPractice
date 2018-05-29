
;var dcp = (function() {
    var photoPosts = [
        {
            id: '1',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'rand1.jpg',
        },
        {
            id: '2',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand2.jpg',
        },
        {
            id: '3',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand3.jpg',
        },
        {
            id: '4',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand4.jpg',
        },
        {
            id: '5',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand5.jpg',
        },
        {
            id: '6',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand6.jpg',
        },
        {
            id: '7',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'rand7.jpg',
        },
        {
            id: '8',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'Sanya1.jpg',
        },
        {
            id: '9',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'Leha1.jpg',
        },
        {
            id: '10',
            description: 'AAAAAAAAAAAAAAAAAAAAAAAAAa',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'ADSD FASFS',
            photoLink: 'Leha2.jpg',
        }
    ];

    function compareDate(a, b) {
        return a.createdAt - b.createdAt;
    }

    function print(a, b) {
        for (var i = a; i < b; i++) {
            if (photoPosts[i]) {
                console.log(photoPosts[i].id + " " + photoPosts[i].description + " " + photoPosts[i].createdAt + " " +
                    photoPosts[i].author + " " + photoPosts[i].photoLink + "\n")
            }
        }
    }

    function getPhotoPosts(skip, top, filterConfig) {
       // skip = skip || 0;
       // top = top || 0;
        if (!filterConfig) {
            return photoPosts.slice(skip, skip + top);
        }
        else {
            var result = photoPosts;
            if (filterConfig.author) {
                result = result.filter(function (post) {
                    return post.author === filterConfig.author;
                })
            }
            if (filterConfig.createdAt) {
                result = result.filter(function (post) {
                    return post.createdAt === filterConfig.createdAt;
                })
            }
            return result.sort(compareDate).slice(skip, top);
        }
    }

    function getPhotoPost(id) {
        var found = photoPosts.find(function (element) {
            return element.id === id;
        });
        return found;
    }

    function validatePhotoPost(post) {
        if (typeof post.id !== "string" || typeof post.description !== "string"
            || typeof post.author !== "string" || typeof post.photoLink !== "string"
            || !(post.createdAt instanceof Date)) {
            return false;
        }
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === post.id) {
                return false;
            }
        }
        if (post.description.length === 0 || post.description.length >= 200) {
            return false;
        }
        if (!post.createdAt || post.createdAt.toString() === "Invalid Date") {
            return false;
        }
        if (post.author.length === 0 || !post.author) {
            return false;
        }
        return true;
    }

    function addPhotoPost(post) {
        if (validatePhotoPost(post)) {
            console.log(post);
            photoPosts[photoPosts.length] = post;
            return true;
        }
        return false;
    }

    function find(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === value) return i;
        }
        return -1;
    }

    function removePhotoPost(id) {
        var found = find(photoPosts, id);
        photoPosts.splice(found, 1);
        if (found === -1) {
            return false;
        } else {
            return true;
        }
    }

    function editPhotoPost(id, object) {
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                var temp = Object.assign({}, photoPosts[i]);
                if (object.photoLink) {
                    if (object.photoLink.length !== 0) {
                        temp.photoLink = object.photoLink
                    }
                    else {
                        return false;
                    }
                }
                if (object.description) {
                    if (object.description.length === 0 || object.description.length >= 200) {
                        return false;
                    }
                    else {
                        temp.description = object.description
                    }
                }
                photoPosts[i] = temp;
                return true;
            }
        }
    }

    return {
        getPhotoPost: getPhotoPost,
        getPhotoPosts:getPhotoPosts,
        validatePhotoPost:validatePhotoPost,
        addPhotoPost:addPhotoPost,
        editPhotoPost:editPhotoPost,
        print: print,
        removePhotoPost: removePhotoPost,
        compareDate: compareDate
    }

})();


