import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, CONSTANT, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../../components/category/Category';
import Divider from '../../components/utilities/Divider';
import UserProfile from '../../components/utilities/UserProfile';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { io } from 'socket.io-client';
import Updates from './homeComponents/Updates';
import { setPostData } from '../../redux/state/postSlice';
const socket = io(CONSTANT.SERVER_URL, { transports: ['websocket'] });

const Home = () => {
    const [data, setData] = useState('Empty');
    const [userData, setUserData] = useState({});
    const auth = useSelector(state => state.auth);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const category = [
        {
            name: 'Contest',
            head: 'Join in',
            icon: 'trophy-sharp',
            questionCount: 120,
            route: ROUTES.CONTEST_NAVIGATOR
        },
        {
            name: 'Practice',
            head: 'Join in',
            icon: 'book-sharp',
            questionCount: 200,
            route: ROUTES.CONTEST
        },
        {
            name: 'Contest',
            head: 'Upcoming',
            icon: 'trophy-sharp',
            questionCount: 100,
            route: ROUTES.CONTEST
        },
        {
            name: 'Quiz',
            head: 'Join in',
            icon: 'pencil-sharp',
            questionCount: 20,
            route: ROUTES.CONTEST
        }
    ];
    const topSolver = [
        {
            name: 'Masud',
            rank: 1,
            solved: 120,
            point: 750
        },
        {
            name: 'Nishat',
            rank: 2,
            solved: 100,
            point: 700
        },
        {
            name: 'Shifat',
            rank: 3,
            solved: 90,
            point: 690
        },
        {
            name: 'Riaj',
            rank: 4,
            solved: 70,
            point: 680
        }
    ];
    const topSolvers = topSolver.map((user, idx) => {
        return <UserProfile user={user} key={idx} />;
    });
    const loadPost = () => {
        const url = CONSTANT.SERVER_URL + 'post/getAll';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    dispatch(setPostData({ data: res.data }));
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setUserData(auth.userData);
        loadPost();
        socket.off('loadPost').on('loadPost', data => {
            console.log(data);
            loadPost();
        });
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer} className="space-y-3">
            <View
                className={
                    'px-3 py-1 bg-emerald-100 flex flex-row rounded bg-opacity-10 justify-center items-center'
                }>
                <View style={styles.textSection}>
                    <Text className="font-bold text-xl text-gray-600">
                        Hi, {userData.name + ' ' + data}
                    </Text>
                    <Text className={' font-bold text-slate-400'}>
                        Let's make this day productive
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Avatar.Image
                        className="overflow-hidden p-0 m-0 items-center justify-center border-green-500 border-4"
                        source={{ uri: CONSTANT.SERVER_URL + userData.avatar }}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-2 flex-row justify-between bg-slate-100 rounded py-3 mb-2 divide-x-2 divide-slate-300">
                    <View className="w-1/2 flex flex-row items-center space-x-2 px-3 justify-center">
                        <View>
                            <Icon
                                name="trophy-sharp"
                                size={35}
                                color={'#F49D1A'}
                            />
                        </View>
                        <View>
                            <Text className="font-bold text-md">Ranking</Text>
                            <Text className="font-bold text-lg text-amber-500">
                                123
                            </Text>
                        </View>
                    </View>
                    <View className="w-1/2 flex flex-row items-center justify-center space-x-2 px-3">
                        <View>
                            <Icon
                                name="server-sharp"
                                size={35}
                                color={'#F49D1A'}
                            />
                        </View>
                        <View>
                            <Text className="font-bold text-md">Points</Text>
                            <Text className="font-bold text-lg text-amber-500">
                                1256
                            </Text>
                        </View>
                    </View>
                </View>
                <ImageBackground
                    source={require('../../assets/bg/1.png')}
                    className="w-full rounded overflow-hidden">
                    <View className="flex bg-slate-5002 space-y-1 py-2 rounded">
                        <View className="flex flex-row space-x-2 p-2 justify-around">
                            <Category item={category[0]} />
                            <Category item={category[1]} />
                        </View>
                        <View className="flex flex-row space-x-2 p-2 justify-around">
                            <Category item={category[2]} />
                            <Category item={category[3]} />
                        </View>
                    </View>
                </ImageBackground>
                <Divider text={'Top Solvers'} css="text-lg font-bold" />
                <ScrollView horizontal={true}>
                    <View className="flex flex-row py-2">{topSolvers}</View>
                </ScrollView>
                <View>
                    <Updates />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        padding: 10,
        paddingBottom: 0
    },
    container1: {
        backgroundColor: COLORS.gray,
        padding: 4,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row'
    },
    textSection: {
        flex: 1
    },
    grid: {
        flex: 2,
        flexDirection: 'row'
    }
});
