var songList = [
{"name":"南山南","songer":"cater","edtion":"张磊","duration":"3:53","url":"http://upuwmp3.changba.com/userdata/userwork/89/580263089.mp3"},
{"name":"愿得一人心","songer":"cater","edtion":"张行亮","duration":"3:53","url":"http://upuwmp3.changba.com/userdata/userwork/15/468071015.mp3"}
];
var song_now_rank=0;

console.log(songList[0].url);

$("#music_video").attr("src",songList[0].url);

$("#btn-next").bind("click touchstart",function(){
	if(song_now_rank<songList.length-1){
		song_now_rank++;
		$("#music_video").attr("src",songList[song_now_rank].url);
	}
});

$("#btn-pre").bind("click touchstart",function(){
	if(song_now_rank>0){
		song_now_rank--;
		$("#music_video").attr("src",songList[song_now_rank].url);
	}
});

