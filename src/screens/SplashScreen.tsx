import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
    StatusBar,
    Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

// Design Constants
const BG_DARK = '#021B2F';
const BG_LIGHT = '#0B4A6F';
const CYAN = '#00C2FF';
const WHITE = '#FFFFFF';
const GRAY = '#A0AEC0';

// Particle component for background
const Particle = ({ delay, startX, startY }: { delay: number, startX: number, startY: number }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, {
                    toValue: 0.6,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.particle,
                {
                    left: startX,
                    top: startY,
                    opacity
                }
            ]}
        />
    );
};

export const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // Animation Values
    const logoScale = useRef(new Animated.Value(0.9)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const haloScale = useRef(new Animated.Value(0.5)).current;
    const haloOpacity = useRef(new Animated.Value(0)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const progressWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start Animations
        Animated.parallel([
            // Logo Scale & Fade
            Animated.timing(logoScale, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            // Halo Animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(haloScale, {
                        toValue: 1.2,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(haloScale, {
                        toValue: 0.8,
                        duration: 1500,
                        useNativeDriver: true,
                    })
                ])
            ),
            Animated.timing(haloOpacity, {
                toValue: 0.8,
                duration: 1000,
                useNativeDriver: true,
            }),
            // Content Fade In
            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 1000,
                delay: 400,
                useNativeDriver: true,
            }),
            // Progress Bar Animation
            Animated.timing(progressWidth, {
                toValue: 1,
                duration: 2500,
                easing: Easing.linear,
                useNativeDriver: false, // width doesn't support native driver
            })
        ]).start();

        // Redirect after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    const barWidth = progressWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    // Generate some particles
    const particles = [
        { id: 1, x: width * 0.1, y: height * 0.2, delay: 0 },
        { id: 2, x: width * 0.85, y: height * 0.35, delay: 500 },
        { id: 3, x: width * 0.15, y: height * 0.7, delay: 1000 },
        { id: 4, x: width * 0.8, y: height * 0.8, delay: 1500 },
        { id: 5, x: width * 0.5, y: height * 0.1, delay: 2000 },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />

            {/* Background Particles */}
            {particles.map(p => (
                <Particle key={p.id} startX={p.x} startY={p.y} delay={p.delay} />
            ))}

            <View style={styles.centerContent}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Animated.View style={[
                        styles.halo,
                        {
                            opacity: haloOpacity,
                            transform: [{ scale: haloScale }]
                        }
                    ]} />

                    <Animated.Image
                        source={require('../../assets/images/rd_club_logo.png')}
                        style={[
                            styles.logo,
                            {
                                opacity: logoOpacity,
                                transform: [{ scale: logoScale }]
                            }
                        ]}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Content */}
                <Animated.View style={[styles.textContent, { opacity: contentOpacity }]}>
                    <View style={styles.titleRow}>
                        <Text style={styles.titleText}>Abhinav </Text>
                        <Text style={[styles.titleText, { color: CYAN }]}>2026</Text>
                    </View>

                    <Text style={styles.subtitle}>YOUNG PROFESSIONAL CONFERENCE</Text>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressTrack}>
                            <Animated.View style={[styles.progressBar, { width: barWidth }]} />
                        </View>
                        <Text style={styles.loadingText}>INITIALIZING RESEARCH HUB...</Text>
                    </View>
                </Animated.View>
            </View>

            {/* Footer Tagline */}
            <Animated.View style={[styles.footer, { opacity: contentOpacity }]}>
                <Text style={styles.footerText}>
                    REVOLUTIONIZE  •  INNOVATE  •  RESEARCH  •  PUBLISH
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_DARK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: CYAN,
    },
    centerContent: {
        alignItems: 'center',
        width: '100%',
        marginTop: -40, // Slightly offset center
    },
    logoContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    halo: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: WHITE,
        shadowColor: WHITE,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 8,
    },
    logo: {
        width: 150,
        height: 150,
        zIndex: 1,
    },
    textContent: {
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 48,
        fontWeight: '900',
        color: WHITE,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        color: GRAY,
        letterSpacing: 3,
        fontWeight: '600',
        marginTop: 5,
        textTransform: 'uppercase',
    },
    progressContainer: {
        marginTop: 60,
        width: width * 0.6,
        alignItems: 'center',
    },
    progressTrack: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: CYAN,
        borderRadius: 2,
        shadowColor: CYAN,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    loadingText: {
        fontSize: 10,
        color: CYAN,
        letterSpacing: 1,
        marginTop: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        opacity: 0.8,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        paddingHorizontal: 20,
    },
    footerText: {
        fontSize: 12,
        color: GRAY,
        letterSpacing: 2,
        textAlign: 'center',
        opacity: 0.6,
    }
});
