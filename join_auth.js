var memObj = {};
var confirmCk = '';
memObj['idck'] = false;
memObj['idol'] = false;
memObj['passck'] = false;
memObj['repassck'] = false;
memObj['agreeck'] = false;
memObj['recpchack'] = false;


function midck(){
	var mid = $('#mid').val();
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(exptext.test(mid)==false){
		//이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
//		jAlert('이메일 형식이 올바르지 않습니다.','');
		memObj['idck'] = false;
//		return false;
	}else{
		memObj['idck'] = true;
	}

	memObj['idol'] = false;

						console.log('--------------------');
					console.log(memObj);
					console.log('--------------------');
}

//아이디체크!!!
function checkMemInfo(){
	var mid = $('#mid').val();

	if(!mid){
		jAlert('이메일을 입력해주세요.', '');
		memObj['idck'] = false;
		return false;
	}else{
//		console.log(mid);
		var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
		if(exptext.test(mid)==false){
			//이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
			jAlert('이메일 형식이 올바르지 않습니다.','');
			memObj['idck'] = false;
			return false;
		}else{

			$.ajax({
				type: 'post',	//전송타입
				dataType: 'json',	//전송데이터타입
				url: '/home/layouts/member/basic/member_existence.php',	//파라미터 전달할 url
				data: {				//전송할 데이터
							kr_id : mid
						},
				success: function (data) {	//통신성공시 이벤트 핸들러 (이벤트가 발생했을때 처리를 담당하는 실행함수)

					if(data){ //회원중 아이디가 사용중일때
						jAlert('이미 가입된 이메일 ('+data+')입니다.', '');
						memObj['idck'] = false;
						memObj['idol'] = false;
						return false;
					}else{
						jAlert('사용 가능한 이메일입니다.', '');
						memObj['idck'] = true;
						memObj['idol'] = true;
						return false;
					}

				},
				error: function (request, status, error) {		//ajax 통신 에러시 에러코드 출력
					console.log('code: '+request.status+"\n"+'message: '+request.responseText+"\n"+'error: '+error);
				}
			});
		}
	
	}
					console.log('--------------------');
					console.log(memObj);
					console.log('--------------------');
}



//비밀번호입력체크!!!
function passCk(obj){

	if(obj){

		if(!obj.value){
			$('#passtxt').text('');
			memObj['passck'] = false;
		}else{		
			var reg_pwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,}$/;    //대문자 포함
			if(reg_pwd.test(obj.value)==false){
				$('#passtxt').css('color','#dc2323');
				$('#passtxt').text('잘못된 비밀번호 형식입니다');
				memObj['passck'] = false;
			}else{
				$('#passtxt').text('올바른 비밀번호 형식입니다');
				$('#passtxt').css('color','#066f06');
				memObj['passck'] = true;
			}
		}

	}else{

		 if($('#pass').val()==''){
			$('#repasstxt').text('');
			memObj['repassck'] = false;			
		 }else{
			 if($('#pass').val() == $('#repass').val()){
				$('#repasstxt').css('color','#066f06');
				$('#repasstxt').text('비밀번호가 일치합니다.');
				memObj['repassck'] = true;
			 }else{
				$('#repasstxt').css('color','#dc2323');
				$('#repasstxt').text('비밀번호가 일치하지 않습니다.');
				memObj['repassck'] = false;
			 }
		 }

	}

					console.log('--------------------');
					console.log(memObj);
					console.log('--------------------');

}




//회원가입버튼 클릭!!!
function mem_apply(){

	console.log('--------------------');
	console.log(memObj);
	console.log('--------------------');

	if(memObj['idck']==false){
		jAlert('이메일을 확인해주세요.', '');
		return false;
	}else if(memObj['idol']==false){
		jAlert('이메일 중복확인을 해주세요.', '');
		return false;
	}else if(memObj['passck']==false){
		jAlert('비밀번호 확인을 해주세요.', '');
		return false;
	}else if(memObj['repassck']==false){
		jAlert('비밀번호 확인을 확인 해주세요.', '');
		return false;
	}

	$('.terms-check').each(function(){
		var n = $('.terms-check').index(this);

//		console.log(n);
		var check = $('.terms-check').eq(n).prop('checked');
		var agreetxt = '';
		
		console.log(check);

		if(check==false){
//			if(n==0 || n==1 || n==2){
//				agreetxt = '약관동의(필수) > 전문보기 > 동의 버튼 클릭 진행 후 회원가입 버튼을 클릭하시기 바랍니다.';
//				jAlert(''+agreetxt+'', '');
//				memObj['agreeck'] = false;
////			}else if(n==1){
////				agreetxt = '개인정보 취급방침에 동의해주세요.';
////
////			}else if(n==2){
////				agreetxt = ' 암호화폐 거래소 이용시 유의사항에 동의해주세요.';
////
////			}else{
//			}else{
//				memObj['agreeck'] = true;
//			}
//
			if(n!=3){
				agreetxt = '약관동의(필수) > 전문보기 > 동의 버튼 클릭 진행 후 회원가입 버튼을 클릭하시기 바랍니다.';
				memObj['agreeck'] = false;
				jAlert(''+agreetxt+'', '');
				return false;
			}
			
		}else{
			memObj['agreeck'] = true;
		}
	});

	if(memObj['agreeck'] == true){
		if(grecaptcha.getResponse() == ''){
			jAlert('리캡차를 체크하셔야합니다. ','');
			return false;
		}else{
			memObj['recpchack'] = true;
			confirmCk = true;
		}
	}
	
//	console.log('confirmCk : '+confirmCk);

	if(confirmCk==true){
		console.log('가입시키자!');		 //요기에 가입!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		mem_join.submit();
	}



	

}



