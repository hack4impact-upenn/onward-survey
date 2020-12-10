import { mean, median, std } from 'mathjs';
import React from 'react';
import { useQuery } from 'react-query';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchData } from '../api/userApi';
import { fetchEmployees } from '../api/userApi';
import { fetchMe } from '../api/userApi';
import VictoryGraph from '../components/VictoryGraph';
import VictoryPie from '../components/VictoryPie';
import auth from '../utils/auth';
import 'swiper/swiper.scss';

SwiperCore.use([Navigation, Pagination]);

interface Props {}

const ViewResultsPage = () => {
  const employeeQuery = useQuery(
    ['fetchData', { accessToken: auth.getAccessToken() }],
    fetchData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const meQuery = useQuery(
    ['fetchMe', { accessToken: auth.getAccessToken() }],
    fetchMe,
    {
      refetchOnWindowFocus: false,
    }
  );

  // map of answer/count for question 1
  const map1 = new Map<string, number>([
    ['1', 0],
    ['2', 0],
    ['3', 0],
    ['4', 0],
    ['5', 0],
    ['6', 0],
    ['7', 0],
    ['8', 0],
    ['9', 0],
    ['10', 0],
  ]);

  // map of answer/count for question 2
  /*const map2 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
  ]);*/
  const map2 = new Map<string, number>([
    ['Never', 0],
    ['Almost never - a few times a year', 0],
    ['Sometimes - 1-2 times a month', 0],
    ['Frequently - at least weekly', 0],
    ['Almost always - almost everyday, or every day', 0],
  ]);

  // map of answer/count for question 3
  /*const map3 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
    ['F', 0],
    ['G', 0],
    ['H', 0],
    ['I', 0],
  ]);*/
  const map3 = new Map<string, number>([
    ['Pay with cash or credit card paid in full', 0],
    ['Credit card and pay it off over time', 0],
    ['Money from bank loan', 0],
    ['Borrow from friend/family', 0],
    ['Use payday loan/overdraft', 0],
    ['Sell something', 0],
    ['Ask for salary advance or loan from workplace', 0],
    ['Other (if so, how?)', 0],
    ['Would not be able to pay', 0],
  ]);

  // map of answer/count for question 4
  const map4 = new Map<string, number>([
    ['Did not pay full rent/mortgage', 0],
    ['Skipped paying a bill or paid late', 0],
    ['Skipped essential medical care due to cost', 0],
    ['Could not afford food', 0],
    ['Had credit declined', 0],
    ['Overdraft a bank account', 0],
    ['Borrowed from a payday lender/pawn shop/car title lender', 0],
  ]);

  // map of answer/count for question 5
  /*const map5 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
    ['F', 0],
    ['G', 0],
  ]);*/
  const map5 = new Map<string, number>([
    ['A free savings account', 0],
    ['Short financial tips', 0],
    ['Articles about how to more effectively save', 0],
    ['Personalized, 1:1 financial coaching', 0],
    ['Loans', 0],
    ['Pay advances', 0],
    ['Other', 0],
  ]);

  // map of answer/count for question 6
  /*const map6 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
  ]);*/
  const map6 = new Map<string, number>([
    ['Having enough emergency savings', 0],
    ['Meeting monthly expenses', 0],
    ['Paying off debt', 0],
    ['Being able to retire/retire on time', 0],
    ['Other', 0],
  ]);

  const survey: string[][] = [[], [], [], [], [], []];
  const counters: Map<number, Map<string, number>> = new Map([
    [1, map1],
    [2, map2],
    [3, map3],
    [4, map4],
    [5, map5],
    [6, map6],
  ]);
  const finalData: GraphData[][] = [[], [], [], [], [], []];

  interface MyDataResponse {
    _v: number;
    _id: string;
    responses: ITempSurveyAnswers[];
    surveyId: string;
  }

  interface ITempSurveyAnswers {
    [questionNumber: number]: String[];
  }

  interface MyData extends IAPIResponse {
    data: MyDataResponse[];
  }

  var totalAnswers: number = 0;

  const questions: string[] = [
    'On a scale of 1-10 how would you rate your financial stability?',
    'How often do you worry about your financial situation?',
    'How would you handle an unexpected $400 expense?',
    'What type(s) of financial hardship have you experienced in the\n past 6 months?',
    'What kinds of financial help would you use, if it were offered\n to you by the employer?',
    'What are your top financial concerns?',
  ];

  interface GraphData {
    x: string;
    y: number;
  }

  const organizeArray = (results: any) => {
    totalAnswers = results.length;
    for (var i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.responses instanceof Array) {
        for (var j = 0; j < result.responses.length; j++) {
          const answerObject = result.responses[j];
          const property = 'q' + (j + 1);

          if (answerObject[property] instanceof Array) {
            const answerObjectK = answerObject[property];
            for (var k = 0; k < answerObjectK.length; k++) {
              survey[j].push(answerObjectK[Object.keys(answerObjectK)[0]]);
            }
          }
        }
      }
    }
  };

  /* assuming that every answer comes in an array (even if single answer) */
  const partitionIntoMaps = () => {
    for (var i = 0; i < survey.length; i++) {
      const numberedArray = survey[i];
      for (var j = 0; j < survey.length; j++) {
        if (counters.has(i + 1)) {
          let surveyMap = counters.get(i + 1) ?? new Map();
          const surveyMapAnswer = surveyMap.get(numberedArray[j]) ?? -1;
          surveyMap.set(numberedArray[j], surveyMapAnswer + 1);
        }
      }
    }
  };

  const mapsToArrays = () => {
    for (var i = 0; i < finalData.length; i++) {
      const surveyMap: Map<string, number> =
        counters.get(i + 1) ?? new Map<string, number>();
      surveyMap.forEach((value, key) => {
        var jsonObject: GraphData = { x: '', y: 0 };
        jsonObject.x = key;
        jsonObject.y = value;
        finalData[i].push(jsonObject);
      });
      // Function to sort bar graphs (looks bad sorted)
      // finalData[i].sort((a, b) => (a.y < b.y ? 1 : -1));
    }
  };

  const createFinalData = (results: any) => {
    organizeArray(results);
    partitionIntoMaps();
    mapsToArrays();
    return finalData;
  };

  const arrayFromMap = (array: GraphData[]) => {
    const newArray: number[] = [];
    for (var i = 0; i < array.length; i++) {
      const element = array[i];
      const value = element.x;
      const number = element.y;
      for (var j = 0; j < number; j++) {
        newArray.push(parseInt(value));
      }
    }
    return newArray;
  };

  const Placeholder = () => {
    return (
      <p>
        50% of your employees must complete the survey in order to see results.
      </p>
    );
  };

  const MyTable = (res: MyData) => {
    const { data: myData } = res;
    const data = createFinalData(myData);
    const arrayWithQ1 = arrayFromMap(finalData[0]);
    const q1DataValues: string =
      'Median: ' +
      median(arrayWithQ1) +
      ' | Mean: ' +
      mean(arrayWithQ1).toFixed(3) +
      ' | Standard Deviation: ' +
      std(arrayWithQ1).toFixed(3);

    const q1legend = [
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
      { name: '7' },
      { name: '8' },
      { name: '9' },
      { name: '10' },
    ];
    const q2legend = [
      { name: 'Never' },
      { name: 'Almost never - a few times a year' },
      { name: 'Sometimes - 1-2 times a month' },
      { name: 'Frequently - at least weekly' },
      { name: 'Almost always - almost everyday, or every day' },
    ];
    const q6legend = [
      { name: 'Having enough \nemergency savings' },
      { name: 'Meeting monthly \nexpenses' },
      { name: 'Paying off \ndebt' },
      { name: 'Being able to \nretire/retire on \ntime' },
      { name: 'Other' },
    ];
    return (
      <Swiper
        id="main"
        navigation
        pagination
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          <VictoryPie
            questionNumber={1}
            oriented={'vertical'}
            question={questions[0]}
            description={q1DataValues}
            keys={data[0].map((elem) => {
              return elem.x;
            })}
            data={data[0]}
            textLength={100}
            totalAnswers={totalAnswers}
            legend={q1legend}
          />
        </SwiperSlide>

        <SwiperSlide>
          <VictoryPie
            questionNumber={2}
            oriented={'horizontal'}
            numItemsInRow={2}
            question={questions[1]}
            keys={data[1].map((elem) => {
              return elem.x;
            })}
            data={data[1]}
            textLength={200}
            totalAnswers={totalAnswers}
            legend={q2legend}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            questionNumber={3}
            question={questions[2]}
            keys={data[2].map((elem) => {
              return elem.x;
            })}
            data={data[2]}
            textLength={200}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            questionNumber={4}
            question={questions[3]}
            keys={data[3].map((elem) => {
              return elem.x;
            })}
            data={data[3]}
            textLength={200}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            questionNumber={5}
            question={questions[4]}
            keys={data[4].map((elem) => {
              return elem.x;
            })}
            data={data[4]}
            textLength={200}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            questionNumber={6}
            question={questions[5]}
            keys={data[5].map((elem) => {
              return elem.x;
            })}
            data={data[5]}
            textLength={200}
          />
        </SwiperSlide>
      </Swiper>
    );
  };
  const { data: data }: any = meQuery.data;
  return (
    <div>
      {data.thresholdMet ? (
        <>
          {employeeQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            MyTable(employeeQuery.data as any)
          )}
        </>
      ) : (
        Placeholder()
      )}
    </div>
  );
};

export default ViewResultsPage;
