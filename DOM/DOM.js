'use strict';

var MyModule = function() {

    var user = undefined;

    //setNickname();

    //setPhotoProfile();

    function showPhotoPost(photoPost, num) {
        var posts = document.getElementById("BodyImgs");
        var post = document.createElement("div");
        if(num === 6 || num === 9){
            post.className = "CentreImg ImgHolder";
        } else {
            post.className = "ImgHolder";
        }

        var photo = document.createElement("img");
        photo.setAttribute("src", photoPost.photoLink);
        var info = document.createElement("div");
        post.appendChild(photo);
        var nickName = document.createElement("p");
        info.innerHTML = photoPost.author;
        info.appendChild(nickName);
        var descryption = document.createElement("p");
        descryption.className = "Descryption";
        descryption.innerHTML = photoPost.description;
        info.appendChild(descryption);
        var date = document.createElement("p");
        date.className = "Date";
        date.innerHTML = formatDate(photoPost.createdAt);
        info.appendChild(date);
        if(user === photoPost.author) {
            var buttonDelete = document.createElement("img");
            buttonDelete.setAttribute("src", "https://image.flaticon.com/icons/svg/618/618424.svg",
                "alt" , "Удалить");
            buttonDelete.className = "DeleteImg";
            var buttonEdit = document.createElement("img");
            buttonEdit.setAttribute("src", "https://image.flaticon.com/icons/svg/149/149307.svg",
                "alt" , "Редактировать");
            buttonEdit.className = "RedactImg";
            info.appendChild(buttonEdit);
            info.appendChild(buttonDelete);
        }
        post.appendChild(info);
        posts.appendChild(post);
    }

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    function showPosts(skip, top, filterConfig) {
        update();
        var photoPosts = dcp.getPhotoPosts(skip, top, filterConfig);
        for (var i = 0; i < photoPosts.length; i++) {
                showPhotoPost(photoPosts[i], i + 1);
        }
    }

    function addPhotoPost(post) {
        dcp.addPhotoPost(post);
        showPosts(0,10);
    }

    function removePhotoPostLabeled(id) {
        dcp.removePhotoPost(id);
        showPosts(0,10);
    }

    function editPost(id,post) {
        dcp.editPhotoPost(id, post);
        showPosts(0,10);
    }

    function update(){
        var posts = document.getElementById("BodyImgs");
        posts.innerHTML = "";
    }

    function makeHeader() {
        var head = document.getElementById("header");
        head.innerHTML = "<img class=\"imgSkeeba\" src = \"skeebaGipeg.jpg\" alt = \"Лого\"/>\n" +
                    "    <div class=\"Filter\">\n" +
                    "        <p class=\"FilterName\">Фильтр</p>\n" +
                    "        <div>\n" +
                    "            <p>Имя</p> <p>Дата</p>\n" +
                    "        </div>\n" +
                    "        <input>\n" +
                    "    </div>";
        if (!user) {
            var signIn = document.createElement("div");
            signIn.className = "Avatar";
            signIn.innerHTML = "<p> Зарегистрируйтесб";
            head.appendChild(signIn);
        } else {
            var adding = document.createElement("div");
            adding.className = "AddButton";
            adding.innerHTML = "<a title=\"Добавь фотку\">\n" +
                "                    <img src = \"addPhoto.jpg\" alt = \"Добавить фото\"/>\n" +
                "               </a>\n" +
                "               <p>Загрузи своё фото</p>";
            head.appendChild(adding);
            var ava = document.createElement("div");
            ava.className = "Avatar";
            ava.innerHTML = "<img src=\"ava.jpg\" alt = \"Аватар\"/>\n" +
                "        <p>Михед Дима</p>\n" +
                "        <a title=\"Выход\">\n" +
                "            <img src=\"exit.jpg\" alt = \"Выход\"/>\n" +
                "        </a>";
            head.appendChild(ava);
        }
    }
    makeHeader();

    showPosts(0,1);

    editPost("1", {description:"У нас было...."});

    removePhotoPostLabeled("3");

    addPhotoPost({
        id: '17',
        description: 'Нэвэльнэ',
        createdAt: new Date('2018-04-23T15:00:00'),
        author: 'Дмитриев Дмитрий',
        photoLink: 'http://www.vladtime.ru/uploads/posts/2018-01/1515326200_navalnyi-o-alishere-usmanove-mitingah-i-kirille-serebrennikove.jpg',
    });
}();
