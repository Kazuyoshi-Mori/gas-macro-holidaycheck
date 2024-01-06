function checkTest(){
  let checkDay = new Date(2024, 2-1, 1);
  let kekka = offDayCheck(checkDay);
  console.log(kekka[0]); // 祝日：true 祝日以外：false
  console.log(kekka[1]); // 祝日の名前
}
function offDayCheck(cDate){
  // 国民の祝日に関する法律３条２項判定（祝日が日曜日の場合、その後の祝日でない日に振替）
  let searchDay = new Date(cDate);
  let kekka = holidayCheck(searchDay);
  if (kekka[0] === false){
    for (let i = 0; i <= 6; i++){
      searchDay.setDate(searchDay.getDate()-1);
      if (holidayCheck(searchDay)[0] === true){
        if (searchDay.getDay() === 0){
          return [true, "振替休日"];
        }
      }else{
        break;
      }
    }

    // 国民の祝日に関する法律３条3項判定（前後が祝日の間の日は休日）
    let lastDay = new Date(cDate);
    lastDay.setDate(lastDay.getDate()-1);
    let nextDay = new Date(cDate);
    nextDay.setDate(nextDay.getDate()+1);
    if (holidayCheck(lastDay)[0] && holidayCheck(nextDay)[0]){
      return [true, "振替休日"]
    }
  }
  return holidayCheck(cDate);
}

function holidayCheck(cDate) {
  let checkDate = cDate;
  let yearNum = checkDate.getFullYear();
  let monthNum = checkDate.getMonth() + 1;
  let dayNum = checkDate.getDate();
  let kekka = false;
  let meisho = "";
  switch(monthNum){
    case 1:
      // 1月1日（元日）
      if(dayNum == 1){
        kekka = true;
        maisho = "元日";
      }
      // 1月の第２月曜日（成人の日）
      if (dayNum == dayNumFindAtWeekNum(yearNum, monthNum, 2, 1)){
        kekka = true;
        meisho = "成人の日";
      }
      break;
    case 2:
      // 2月11日（建国記念の日）
      if(dayNum == 11){
        kekka = true;
        meisho = "建国記念日";
      }
      // 2月23日（天皇誕生日）
      if(dayNum == 23){
        kekka = true;
        meisho = "天皇誕生日";
      }
      break;
    case 3:
      //春分の日（計算による）
      let shunbunHi =Math.floor(20.8431 + 0.242194 * (yearNum - 1980)) - Math.floor((yearNum - 1980)/4);
      if(dayNum == shunbunHi){
        kekka = true;
        meisho = "春分の日";
      }
      break;
    case 4:
      //  4月29日（昭和の日）
      if (dayNum == 29){
        kekka = true;
        meisho = "昭和の日";
      }
      break;
    case 5:
      // 5月3日（憲法記念日）
      if (dayNum == 3){
        kekka = true;
        meisho = "憲法記念日";
      }
      // 5月3日（みどりの日）
      if (dayNum == 4){
        kekka = true;
        meisho = "みどりの日";
      }
      // 5月5日（こどもの日）
      if (dayNum == 5){
        kekka = true;
        meisho = "こどもの日";
      }
      break;
    case 7:
      //2020年7月23日（海の日）　2020年7月24日（スポーツの日）
      if (yearNum == 2020){
        if (dayNum == 23){
          kekka = true;
          meisho = "海の日";
        }else if(dayNum == 24){
            kekka = true;
            meisho = "スポーツの日";
        }
      }
      //7月第３月曜日（海の日)
      if (dayNum == dayNumFindAtWeekNum(yearNum, monthNum, 3, 1)){
        kekka = true;
        meisho = "海の日";
      }
      break;
    case 8:
      //2020年8月10日（山の日）
      if ((yearNum == 2020) && (dayNum == 10)){
        kekka = true;
        meisho = "山の日";
      }else if(dayNum == 11){
      //8月10日（山の日）
        kekka = true;
        meisho = "山の日";
      }
      break;
    case 9:
      // 秋分の日（計算による）
      let shuubunHi =Math.floor(23.2488 + 0.242194 * (yearNum - 1980)) - Math.floor((yearNum - 1980)/4);
      if (dayNum == shuubunHi){
          kekka = true;
          meisho = "秋分の日";
      }
      // 9月第３月曜日(敬老の日)
        if (dayNum == dayNumFindAtWeekNum(yearNum, monthNum, 3, 1)){
          kekka = true;
          meisho = "敬老の日";
        }
      break;
    case 10:
      // 10月第２月曜日（スポーツの日）
        if (dayNum == dayNumFindAtWeekNum(yearNum, monthNum, 2, 1)){
          kekka = true;
          meisho = "スポーツの日";
        }
      break;
    case 11:
      // 11月3日（文化の日）
      if (dayNum == 3){
        kekka = true;
        meisho = "文化の日";
      }
      // 11月23日（勤労感謝の日）
      if (dayNum == 23){
        kekka = true;
        meisho = "勤労感謝の日"
      }
      break;
    default: 
      break;
  }
  return [kekka, meisho];
}
function test(){
  console.log(dayNumFindAtWeekNum(2024,1,2,1))
}

function dayNumFindAtWeekNum(year, month, weekNum, weekDnum){
  let count = 1;
  for (let i = 1; i <=28; i++){
    let cd = new Date(year, month-1, i);
    if (cd.getDay() == weekDnum){
      if (count == weekNum){
        return i;
      }else{
        count += 1;
      }
    }
  }
  return 0;
}

