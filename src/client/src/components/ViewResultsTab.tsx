import React from 'react';
import auth from '../utils/auth';
import { fetchData } from '../api/userApi';
import { useQuery } from 'react-query';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import VictoryGraph from '../components/VictoryGraph';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

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
  const map2 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
  ]);
  const map3 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
    ['F', 0],
    ['G', 0],
    ['H', 0],
    ['I', 0],
  ]);
  const map4 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
    ['F', 0],
    ['G', 0],
  ]);
  const map5 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
    ['F', 0],
    ['G', 0],
  ]);
  const map6 = new Map<string, number>([
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
    ['E', 0],
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
    responses: ISurveyAnswers[];
    surveyId: string;
  }

  interface MyData extends IAPIResponse {
    data: MyDataResponse[];
  }

  interface GraphData {
    x: string;
    y: number;
  }

  const organizeArray = (results: any) => {
    for (var i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.responses instanceof Array) {
        for (var j = 0; j < result.responses.length; j++) {
          const answerObject = result.responses[j];
          survey[j].push(answerObject[Object.keys(answerObject)[0]]);
        }
      }
    }
  };
  //
  //
  // assuming that there is one answer per question (not an array)
  //
  //

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
        var jsonObject: GraphData = {x: "", y: 0};
        jsonObject.x = key;
        jsonObject.y = value;
        finalData[i].push(jsonObject);
      });
      finalData[i].sort((a, b) => (a.y < b.y) ? 1 : -1);
    };
  };

  const createFinalData = (results: any) => {
    organizeArray(results);
    partitionIntoMaps();
    mapsToArrays();
    return finalData;
  };

  const MyTable = (res: MyData) => {
    const { data: myData } = res;
    console.log(myData);
    const data = createFinalData(myData);
    console.log(data);
    return (
      <Swiper id='main' navigation pagination
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <VictoryGraph
          question={1}
          keys={data[0].map( (elem) => { return elem.x} )}
          data={data[0]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
          question={2}
          keys={data[1].map( (elem) => { return elem.x} )}
          data={data[1]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            question={3}
            keys={data[2].map( (elem) => { return elem.x} )}
            data={data[2]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            question={4}
            keys={data[3].map( (elem) => { return elem.x} )}
            data={data[3]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            question={5}
            keys={data[4].map( (elem) => { return elem.x} )}
            data={data[4]}
          />
        </SwiperSlide>
        <SwiperSlide>
          <VictoryGraph
            question={6}
            keys={data[5].map( (elem) => { return elem.x} )}
            data={data[5]}
          />
        </SwiperSlide>
      </Swiper>
    );
  };

  return (
    <div>
      {employeeQuery.isLoading && <div>Loading...</div>}
      {employeeQuery.data && MyTable(employeeQuery.data as any)}
    </div>
  );
};

export default ViewResultsPage;
