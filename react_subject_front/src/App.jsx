import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
function App() {
  //리스트 저장용
  const [subList, setSubList] = useState([]);
  //정렬(1:작성순(기본), 2:난이도 오름차순, 3:난이도 내림차순, 4:수강인원 오름차순, 5:수강인원 내림차순)
  const [order, setOrder] = useState(1);

  //사용자가 선택한 값을 기억하기 위해 만든것
  const [keyword, setKeyword] = useState("");

  //검색 누르면 위값을 얘로 저장해서> 실제 검색은 얘를 보내서 할것임
  const [searchKeyword, setSearchKeyword] = useState("");

  //필터링
  const [category, setCategory] = useState(0); //0:전체, (1:백엔드 / 2:프론트엔드 / 3 : DB)
  const [level, setLevel] = useState(0); //0:전체, (1:초급 / 2:중급 / 3:고급)

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?order=${order}&searchKeyword=${searchKeyword}&subjectCategory=${category}
&subjectLevel=${level}`,
      )
      .then((res) => {
        console.log(res);
        setSubList(res.data);
        if (res.data.length === 0) {
          alert("검색 결과가 없습니다.");
          setSearchKeyword("");
          setKeyword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order, searchKeyword, category, level]);
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1>강의목록</h1>
      </header>
      <section>
        <form
          className={styles.form_wrap}
          onSubmit={(e) => {
            e.preventDefault();
            if (!keyword) {
              alert("검색 조건을 초기화합니다.");
              setSearchKeyword("");
              return;
            }
            setSearchKeyword(keyword);
          }}
        >
          <div className={styles.search_wrap}>
            <div className={styles.select_wrap}>
              <select
                className={styles.select}
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
              >
                <option value={1}>작성순</option>
                <option value={2}>난이도 오름차순</option>
                <option value={3}>난이도 내림차순</option>
                <option value={4}>수강인원 오름차순</option>
                <option value={5}>수강인원 내림차순</option>
              </select>

              <select
                className={styles.filter}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={0}>과목분류별</option>
                <option value={1}>백엔드</option>
                <option value={2}>프론트엔드</option>
                <option value={3}>DB</option>
              </select>
              <select
                className={styles.filter}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value={0}>난이도별</option>
                <option value={1}>초급</option>
                <option value={2}>중급</option>
                <option value={3}>고급</option>
              </select>
            </div>

            <div className={styles.input_wrap}>
              <input
                type="text"
                value={keyword}
                placeholder="과목명으로 검색하세요"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <button className={styles.button} type="submit">
                검색
              </button>
              <button
                className={`${styles.button} ${styles.reset}`}
                onClick={(e) => {
                  setOrder(1);
                  setKeyword("");
                  setSearchKeyword("");
                  setCategory(0);
                  setLevel(0);
                }}
              >
                검색 초기화
              </button>
            </div>
          </div>
        </form>

        <div className={styles.subject_wrap}>
          <ul className={styles.subject_title_list}>
            <li className={styles.sub_no}>과목관리번호</li>
            <li className={styles.sub_title}>과목명</li>
            <li className={styles.sub_instructor}>담당강사명</li>
            <li className={styles.sub_category}>과목분류</li>
            <li className={styles.sub_level}>과목난이도</li>
            <li className={styles.sub_count}>수강정원</li>
          </ul>

          {subList.map((sub) => {
            return (
              <ul
                key={`subjectNo: ${sub.subjectNo}`}
                className={styles.subject_list}
              >
                <li className={styles.sub_no}>{sub.subjectNo}</li>
                <li className={styles.sub_title}>{sub.subjectTitle}</li>
                <li className={styles.sub_instructor}>
                  {sub.subjectInstructor}
                </li>
                <li className={styles.sub_category}>
                  {sub.subjectCategory === 1
                    ? "백엔드"
                    : sub.subjectCategory === 2
                      ? "프론트엔드"
                      : "DB"}
                </li>

                <li
                  className={`${styles.sub_level} ${
                    sub.subjectLevel === 1
                      ? styles.level_easy
                      : sub.subjectLevel === 2
                        ? styles.level_mid
                        : styles.level_hard
                  }`}
                >
                  {sub.subjectLevel === 1
                    ? "초급"
                    : sub.subjectLevel === 2
                      ? "중급"
                      : "고급"}
                </li>
                <li className={styles.sub_count}>{sub.subjectCount}</li>
              </ul>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
