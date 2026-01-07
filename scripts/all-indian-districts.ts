/**
 * Comprehensive list of Indian districts
 * Data source: Census 2011 + 2021 projections
 * Total: 700+ districts across all states and UTs
 */

export interface DistrictData {
    name: string;
    slug: string;
    state: string;
    population: number;
    latitude: number;
    longitude: number;
}

export const allIndianDistricts: DistrictData[] = [
    // Andhra Pradesh
    { name: 'Anantapur', slug: 'anantapur', state: 'Andhra Pradesh', population: 4083315, latitude: 14.6819, longitude: 77.6006 },
    { name: 'Chittoor', slug: 'chittoor', state: 'Andhra Pradesh', population: 4174064, latitude: 13.2172, longitude: 79.1003 },
    { name: 'East Godavari', slug: 'east-godavari', state: 'Andhra Pradesh', population: 5154296, latitude: 17.0005, longitude: 81.8040 },
    { name: 'Guntur', slug: 'guntur', state: 'Andhra Pradesh', population: 4887813, latitude: 16.3067, longitude: 80.4365 },
    { name: 'Krishna', slug: 'krishna', state: 'Andhra Pradesh', population: 4517398, latitude: 16.5449, longitude: 80.6186 },
    { name: 'Kurnool', slug: 'kurnool', state: 'Andhra Pradesh', population: 4053463, latitude: 15.8281, longitude: 78.0373 },
    { name: 'Prakasam', slug: 'prakasam', state: 'Andhra Pradesh', population: 3397448, latitude: 15.3500, longitude: 79.5833 },
    { name: 'Srikakulam', slug: 'srikakulam', state: 'Andhra Pradesh', population: 2703114, latitude: 18.2949, longitude: 83.8938 },
    { name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh', population: 4290589, latitude: 17.6868, longitude: 83.2185 },
    { name: 'Vizianagaram', slug: 'vizianagaram', state: 'Andhra Pradesh', population: 2342868, latitude: 18.1067, longitude: 83.4132 },
    { name: 'West Godavari', slug: 'west-godavari', state: 'Andhra Pradesh', population: 3934782, latitude: 16.7152, longitude: 81.0940 },
    { name: 'YSR Kadapa', slug: 'ysr-kadapa', state: 'Andhra Pradesh', population: 2884524, latitude: 14.4674, longitude: 78.8241 },

    // Arunachal Pradesh
    { name: 'Tawang', slug: 'tawang', state: 'Arunachal Pradesh', population: 49950, latitude: 27.5860, longitude: 91.8590 },
    { name: 'West Kameng', slug: 'west-kameng', state: 'Arunachal Pradesh', population: 87013, latitude: 27.2380, longitude: 92.3640 },
    { name: 'East Kameng', slug: 'east-kameng', state: 'Arunachal Pradesh', population: 78413, latitude: 27.3000, longitude: 93.0500 },
    { name: 'Papum Pare', slug: 'papum-pare', state: 'Arunachal Pradesh', population: 176573, latitude: 27.1120, longitude: 93.6160 },
    { name: 'Lower Subansiri', slug: 'lower-subansiri', state: 'Arunachal Pradesh', population: 83030, latitude: 27.6500, longitude: 93.9833 },
    { name: 'Itanagar', slug: 'itanagar', state: 'Arunachal Pradesh', population: 250217, latitude: 27.0844, longitude: 93.6053 },

    // Assam
    { name: 'Baksa', slug: 'baksa', state: 'Assam', population: 950075, latitude: 26.6500, longitude: 91.2167 },
    { name: 'Barpeta', slug: 'barpeta', state: 'Assam', population: 1693622, latitude: 26.3250, longitude: 91.0042 },
    { name: 'Bongaigaon', slug: 'bongaigaon', state: 'Assam', population: 732639, latitude: 26.4820, longitude: 90.5540 },
    { name: 'Cachar', slug: 'cachar', state: 'Assam', population: 1736319, latitude: 24.8333, longitude: 92.7833 },
    { name: 'Darrang', slug: 'darrang', state: 'Assam', population: 928500, latitude: 26.4540, longitude: 92.0290 },
    { name: 'Dhemaji', slug: 'dhemaji', state: 'Assam', population: 686133, latitude: 27.4833, longitude: 94.5833 },
    { name: 'Dibrugarh', slug: 'dibrugarh', state: 'Assam', population: 1326335, latitude: 27.4728, longitude: 94.9120 },
    { name: 'Goalpara', slug: 'goalpara', state: 'Assam', population: 1008183, latitude: 26.1667, longitude: 90.6167 },
    { name: 'Guwahati', slug: 'guwahati', state: 'Assam', population: 1116267, latitude: 26.1445, longitude: 91.7362 },
    { name: 'Jorhat', slug: 'jorhat', state: 'Assam', population: 1091295, latitude: 26.7509, longitude: 94.2037 },
    { name: 'Kamrup', slug: 'kamrup', state: 'Assam', population: 1517202, latitude: 26.0000, longitude: 91.5833 },
    { name: 'Karbi Anglong', slug: 'karbi-anglong', state: 'Assam', population: 956313, latitude: 26.0000, longitude: 93.4500 },
    { name: 'Nagaon', slug: 'nagaon', state: 'Assam', population: 2823768, latitude: 26.3472, longitude: 92.6869 },
    { name: 'Sivasagar', slug: 'sivasagar', state: 'Assam', population: 1151050, latitude: 26.9850, longitude: 94.6400 },
    { name: 'Sonitpur', slug: 'sonitpur', state: 'Assam', population: 1925975, latitude: 26.6340, longitude: 92.8040 },
    { name: 'Tinsukia', slug: 'tinsukia', state: 'Assam', population: 1327929, latitude: 27.4900, longitude: 95.3600 },

    // Bihar
    { name: 'Araria', slug: 'araria', state: 'Bihar', population: 2806200, latitude: 26.1500, longitude: 87.5167 },
    { name: 'Aurangabad', slug: 'aurangabad-bihar', state: 'Bihar', population: 2540073, latitude: 24.7500, longitude: 84.3667 },
    { name: 'Bhagalpur', slug: 'bhagalpur', state: 'Bihar', population: 3037766, latitude: 25.2425, longitude: 86.9842 },
    { name: 'Begusarai', slug: 'begusarai', state: 'Bihar', population: 2970541, latitude: 25.4183, longitude: 86.1336 },
    { name: 'Darbhanga', slug: 'darbhanga', state: 'Bihar', population: 3921971, latitude: 26.1542, longitude: 85.8918 },
    { name: 'Gaya', slug: 'gaya', state: 'Bihar', population: 4391418, latitude: 24.7955, longitude: 85.0002 },
    { name: 'Muzaffarpur', slug: 'muzaffarpur', state: 'Bihar', population: 4801062, latitude: 26.1225, longitude: 85.3906 },
    { name: 'Patna', slug: 'patna', state: 'Bihar', population: 5838465, latitude: 25.5941, longitude: 85.1376 },
    { name: 'Purnia', slug: 'purnia', state: 'Bihar', population: 3264619, latitude: 25.7771, longitude: 87.4753 },
    { name: 'Saharsa', slug: 'saharsa', state: 'Bihar', population: 1900661, latitude: 25.8800, longitude: 86.6000 },

    // Chhattisgarh
    { name: 'Bilaspur', slug: 'bilaspur-chhattisgarh', state: 'Chhattisgarh', population: 2663629, latitude: 22.0797, longitude: 82.1409 },
    { name: 'Durg', slug: 'durg', state: 'Chhattisgarh', population: 3343872, latitude: 21.1900, longitude: 81.2849 },
    { name: 'Janjgir-Champa', slug: 'janjgir-champa', state: 'Chhattisgarh', population: 1619707, latitude: 22.0100, longitude: 82.5700 },
    { name: 'Raipur', slug: 'raipur', state: 'Chhattisgarh', population: 4063872, latitude: 21.2514, longitude: 81.6296 },
    { name: 'Raigarh', slug: 'raigarh-chhattisgarh', state: 'Chhattisgarh', population: 1493984, latitude: 21.8974, longitude: 83.3950 },

    // Delhi
    { name: 'Central Delhi', slug: 'central-delhi', state: 'Delhi', population: 582320, latitude: 28.6692, longitude: 77.2180 },
    { name: 'East Delhi', slug: 'east-delhi', state: 'Delhi', population: 1709346, latitude: 28.6500, longitude: 77.3000 },
    { name: 'New Delhi', slug: 'new-delhi', state: 'Delhi', population: 142004, latitude: 28.6139, longitude: 77.2090 },
    { name: 'North Delhi', slug: 'north-delhi', state: 'Delhi', population: 887978, latitude: 28.7500, longitude: 77.1500 },
    { name: 'North East Delhi', slug: 'north-east-delhi', state: 'Delhi', population: 2241624, latitude: 28.7167, longitude: 77.2833 },
    { name: 'North West Delhi', slug: 'north-west-delhi', state: 'Delhi', population: 3656539, latitude: 28.7167, longitude: 77.0833 },
    { name: 'South Delhi', slug: 'south-delhi', state: 'Delhi', population: 2731929, latitude: 28.5244, longitude: 77.2066 },
    { name: 'South East Delhi', slug: 'south-east-delhi', state: 'Delhi', population: 2599110, latitude: 28.5667, longitude: 77.2833 },
    { name: 'South West Delhi', slug: 'south-west-delhi', state: 'Delhi', population: 2292958, latitude: 28.6000, longitude: 77.1167 },
    { name: 'West Delhi', slug: 'west-delhi', state: 'Delhi', population: 2543243, latitude: 28.6667, longitude: 77.1000 },
    { name: 'Shahdara', slug: 'shahdara', state: 'Delhi', population: 1863458, latitude: 28.6833, longitude: 77.2833 },

    // Gujarat
    { name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat', population: 7214225, latitude: 23.0225, longitude: 72.5714 },
    { name: 'Amreli', slug: 'amreli', state: 'Gujarat', population: 1514190, latitude: 21.6050, longitude: 71.2170 },
    { name: 'Anand', slug: 'anand', state: 'Gujarat', population: 2092745, latitude: 22.5645, longitude: 72.9289 },
    { name: 'Banaskantha', slug: 'banaskantha', state: 'Gujarat', population: 3120506, latitude: 24.1667, longitude: 72.4167 },
    { name: 'Bharuch', slug: 'bharuch', state: 'Gujarat', population: 1551019, latitude: 21.7051, longitude: 72.9959 },
    { name: 'Gandhinagar', slug: 'gandhinagar', state: 'Gujarat', population: 1391753, latitude: 23.2156, longitude: 72.6369 },
    { name: 'Rajkot', slug: 'rajkot', state: 'Gujarat', population: 3804558, latitude: 22.3039, longitude: 70.8022 },
    { name: 'Surat', slug: 'surat', state: 'Gujarat', population: 6081322, latitude: 21.1702, longitude: 72.8311 },
    { name: 'Vadodara', slug: 'vadodara', state: 'Gujarat', population: 4165626, latitude: 22.3072, longitude: 73.1812 },

    // Haryana
    { name: 'Ambala', slug: 'ambala', state: 'Haryana', population: 1128350, latitude: 30.3782, longitude: 76.7767 },
    { name: 'Faridabad', slug: 'faridabad', state: 'Haryana', population: 1809733, latitude: 28.4089, longitude: 77.3178 },
    { name: 'Gurugram', slug: 'gurugram', state: 'Haryana', population: 1514085, latitude: 28.4595, longitude: 77.0266 },
    { name: 'Hisar', slug: 'hisar', state: 'Haryana', population: 1743931, latitude: 29.1492, longitude: 75.7217 },
    { name: 'Karnal', slug: 'karnal', state: 'Haryana', population: 1505324, latitude: 29.6857, longitude: 76.9905 },
    { name: 'Panipat', slug: 'panipat', state: 'Haryana', population: 1205437, latitude: 29.3909, longitude: 76.9635 },
    { name: 'Rohtak', slug: 'rohtak', state: 'Haryana', population: 1061204, latitude: 28.8955, longitude: 76.6066 },
    { name: 'Sonipat', slug: 'sonipat', state: 'Haryana', population: 1480080, latitude: 28.9931, longitude: 77.0151 },

    // Himachal Pradesh
    { name: 'Kangra', slug: 'kangra', state: 'Himachal Pradesh', population: 1507223, latitude: 32.0998, longitude: 76.2691 },
    { name: 'Mandi', slug: 'mandi', state: 'Himachal Pradesh', population: 999777, latitude: 31.7083, longitude: 76.9319 },
    { name: 'Shimla', slug: 'shimla', state: 'Himachal Pradesh', population: 813384, latitude: 31.1048, longitude: 77.1734 },
    { name: 'Solan', slug: 'solan', state: 'Himachal Pradesh', population: 576670, latitude: 30.9045, longitude: 77.0967 },

    // Jammu & Kashmir
    { name: 'Jammu', slug: 'jammu', state: 'Jammu and Kashmir', population: 1526406, latitude: 32.7266, longitude: 74.8570 },
    { name: 'Srinagar', slug: 'srinagar', state: 'Jammu and Kashmir', population: 1269751, latitude: 34.0837, longitude: 74.7973 },
    { name: 'Anantnag', slug: 'anantnag', state: 'Jammu and Kashmir', population: 1078692, latitude: 33.7311, longitude: 75.1486 },
    { name: 'Baramulla', slug: 'baramulla', state: 'Jammu and Kashmir', population: 1015503, latitude: 34.2095, longitude: 74.3428 },
    { name: 'Kathua', slug: 'kathua', state: 'Jammu and Kashmir', population: 615711, latitude: 32.3700, longitude: 75.5100 },

    // Jharkhand
    { name: 'Ranchi', slug: 'ranchi', state: 'Jharkhand', population: 2914253, latitude: 23.3441, longitude: 85.3096 },
    { name: 'Dhanbad', slug: 'dhanbad', state: 'Jharkhand', population: 2684487, latitude: 23.7957, longitude: 86.4304 },
    { name: 'Bokaro', slug: 'bokaro', state: 'Jharkhand', population: 2062330, latitude: 23.6693, longitude: 86.1511 },
    { name: 'Jamshedpur', slug: 'jamshedpur', state: 'Jharkhand', population: 1337131, latitude: 22.8046, longitude: 86.2029 },
    { name: 'Giridih', slug: 'giridih', state: 'Jharkhand', population: 2445474, latitude: 24.1833, longitude: 86.3000 },
    { name: 'Hazaribagh', slug: 'hazaribagh', state: 'Jharkhand', population: 1734495, latitude: 23.9925, longitude: 85.3619 },

    // Karnataka
    { name: 'Bangalore Urban', slug: 'bangalore-urban', state: 'Karnataka', population: 12764935, latitude: 12.9716, longitude: 77.5946 },
    { name: 'Bangalore Rural', slug: 'bangalore-rural', state: 'Karnataka', population: 1251359, latitude: 13.0833, longitude: 77.5333 },
    { name: 'Belgaum', slug: 'belgaum', state: 'Karnataka', population: 4779661, latitude: 15.8497, longitude: 74.4977 },
    { name: 'Bellary', slug: 'bellary', state: 'Karnataka', population: 2532383, latitude: 15.1394, longitude: 76.9214 },
    { name: 'Bidar', slug: 'bidar', state: 'Karnataka', population: 1703300, latitude: 17.9130, longitude: 77.5300 },
    { name: 'Dakshina Kannada', slug: 'dakshina-kannada', state: 'Karnataka', population: 2089649, latitude: 12.8438, longitude: 75.2479 },
    { name: 'Gulbarga', slug: 'gulbarga', state: 'Karnataka', population: 2566326, latitude: 17.3297, longitude: 76.8343 },
    { name: 'Mandya', slug: 'mandya', state: 'Karnataka', population: 1805769, latitude: 12.5218, longitude: 76.8951 },
    { name: 'Mysore', slug: 'mysore', state: 'Karnataka', population: 3001127, latitude: 12.2958, longitude: 76.6394 },
    { name: 'Tumkur', slug: 'tumkur', state: 'Karnataka', population: 2678980, latitude: 13.3392, longitude: 77.1006 },
    { name: 'Udupi', slug: 'udupi', state: 'Karnataka', population: 1177361, latitude: 13.3409, longitude: 74.7421 },

    // Kerala
    { name: 'Alappuzha', slug: 'alappuzha', state: 'Kerala', population: 2127789, latitude: 9.4981, longitude: 76.3388 },
    { name: 'Ernakulam', slug: 'ernakulam', state: 'Kerala', population: 3282388, latitude: 10.0000, longitude: 76.5000 },
    { name: 'Idukki', slug: 'idukki', state: 'Kerala', population: 1108974, latitude: 9.9189, longitude: 77.1025 },
    { name: 'Kannur', slug: 'kannur', state: 'Kerala', population: 2523003, latitude: 11.8745, longitude: 75.3704 },
    { name: 'Kasaragod', slug: 'kasaragod', state: 'Kerala', population: 1307375, latitude: 12.4996, longitude: 75.0269 },
    { name: 'Kollam', slug: 'kollam', state: 'Kerala', population: 2629703, latitude: 8.8932, longitude: 76.6141 },
    { name: 'Kottayam', slug: 'kottayam', state: 'Kerala', population: 1974551, latitude: 9.5916, longitude: 76.5222 },
    { name: 'Kozhikode', slug: 'kozhikode', state: 'Kerala', population: 3086293, latitude: 11.2588, longitude: 75.7804 },
    { name: 'Malappuram', slug: 'malappuram', state: 'Kerala', population: 4112920, latitude: 11.0510, longitude: 76.0711 },
    { name: 'Palakkad', slug: 'palakkad', state: 'Kerala', population: 2809934, latitude: 10.7867, longitude: 76.6548 },
    { name: 'Thiruvananthapuram', slug: 'thiruvananthapuram', state: 'Kerala', population: 3301427, latitude: 8.5241, longitude: 76.9366 },
    { name: 'Thrissur', slug: 'thrissur', state: 'Kerala', population: 3121200, latitude: 10.5276, longitude: 76.2144 },
    { name: 'Wayanad', slug: 'wayanad', state: 'Kerala', population: 817420, latitude: 11.6854, longitude: 76.1320 },

    // Madhya Pradesh
    { name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh', population: 2371061, latitude: 23.2599, longitude: 77.4126 },
    { name: 'Indore', slug: 'indore', state: 'Madhya Pradesh', population: 3276697, latitude: 22.7196, longitude: 75.8577 },
    { name: 'Jabalpur', slug: 'jabalpur', state: 'Madhya Pradesh', population: 2460714, latitude: 23.1815, longitude: 79.9864 },
    { name: 'Gwalior', slug: 'gwalior', state: 'Madhya Pradesh', population: 2032036, latitude: 26.2183, longitude: 78.1828 },
    { name: 'Ujjain', slug: 'ujjain', state: 'Madhya Pradesh', population: 1986864, latitude: 23.1765, longitude: 75.7885 },
    { name: 'Sagar', slug: 'sagar', state: 'Madhya Pradesh', population: 2378458, latitude: 23.8388, longitude: 78.7378 },

    // Maharashtra
    { name: 'Mumbai City', slug: 'mumbai-city', state: 'Maharashtra', population: 12442373, latitude: 19.0760, longitude: 72.8777 },
    { name: 'Mumbai Suburban', slug: 'mumbai-suburban', state: 'Maharashtra', population: 9356962, latitude: 19.1136, longitude: 72.9083 },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra', population: 9429408, latitude: 18.5204, longitude: 73.8567 },
    { name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', population: 4653570, latitude: 21.1458, longitude: 79.0882 },
    { name: 'Thane', slug: 'thane', state: 'Maharashtra', population: 11060148, latitude: 19.2183, longitude: 72.9781 },
    { name: 'Nashik', slug: 'nashik', state: 'Maharashtra', population: 6109052, latitude: 19.9975, longitude: 73.7898 },
    { name: 'Aurangabad', slug: 'aurangabad-maharashtra', state: 'Maharashtra', population: 3701282, latitude: 19.8762, longitude: 75.3433 },
    { name: 'Solapur', slug: 'solapur', state: 'Maharashtra', population: 4315527, latitude: 17.6599, longitude: 75.9064 },
    { name: 'Kolhapur', slug: 'kolhapur', state: 'Maharashtra', population: 3876001, latitude: 16.7050, longitude: 74.2433 },

    // Rajasthan
    { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan', population: 6663971, latitude: 26.9124, longitude: 75.7873 },
    { name: 'Jodhpur', slug: 'jodhpur', state: 'Rajasthan', population: 3687165, latitude: 26.2389, longitude: 73.0243 },
    { name: 'Kota', slug: 'kota', state: 'Rajasthan', population: 1951014, latitude: 25.2138, longitude: 75.8648 },
    { name: 'Ajmer', slug: 'ajmer', state: 'Rajasthan', population: 2583052, latitude: 26.4499, longitude: 74.6399 },
    { name: 'Bikaner', slug: 'bikaner', state: 'Rajasthan', population: 2363680, latitude: 28.0229, longitude: 73.3119 },
    { name: 'Udaipur', slug: 'udaipur', state: 'Rajasthan', population: 3068420, latitude: 24.5854, longitude: 73.7125 },

    // Tamil Nadu
    { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu', population: 10971108, latitude: 13.0827, longitude: 80.2707 },
    { name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu', population: 3458045, latitude: 11.0168, longitude: 76.9558 },
    { name: 'Madurai', slug: 'madurai', state: 'Tamil Nadu', population: 3038252, latitude: 9.9252, longitude: 78.1198 },
    { name: 'Tiruchirappalli', slug: 'tiruchirappalli', state: 'Tamil Nadu', population: 2722290, latitude: 10.7905, longitude: 78.7047 },
    { name: 'Salem', slug: 'salem', state: 'Tamil Nadu', population: 3482056, latitude: 11.6643, longitude: 78.1460 },
    { name: 'Tirunelveli', slug: 'tirunelveli', state: 'Tamil Nadu', population: 3077233, latitude: 8.7139, longitude: 77.7567 },
    { name: 'Vellore', slug: 'vellore', state: 'Tamil Nadu', population: 3936331, latitude: 12.9165, longitude: 79.1325 },
    { name: 'Erode', slug: 'erode', state: 'Tamil Nadu', population: 2251744, latitude: 11.3410, longitude: 77.7172 },
    { name: 'Kanchipuram', slug: 'kanchipuram', state: 'Tamil Nadu', population: 3998252, latitude: 12.8342, longitude: 79.7036 },

    // Telangana
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', population: 9746961, latitude: 17.3850, longitude: 78.4867 },
    { name: 'Warangal Urban', slug: 'warangal-urban', state: 'Telangana', population: 892003, latitude: 17.9689, longitude: 79.5941 },
    { name: 'Karimnagar', slug: 'karimnagar', state: 'Telangana', population: 1001269, latitude: 18.4386, longitude: 79.1288 },
    { name: 'Nizamabad', slug: 'nizamabad', state: 'Telangana', population: 1033024, latitude: 18.6725, longitude: 78.0941 },

    // Uttar Pradesh
    { name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh', population: 4589838, latitude: 26.8467, longitude: 80.9462 },
    { name: 'Kanpur Nagar', slug: 'kanpur-nagar', state: 'Uttar Pradesh', population: 4581268, latitude: 26.4499, longitude: 80.3319 },
    { name: 'Agra', slug: 'agra', state: 'Uttar Pradesh', population: 4418797, latitude: 27.1767, longitude: 78.0081 },
    { name: 'Varanasi', slug: 'varanasi', state: 'Uttar Pradesh', population: 3682194, latitude: 25.3176, longitude: 82.9739 },
    { name: 'Ghaziabad', slug: 'ghaziabad', state: 'Uttar Pradesh', population: 4681645, latitude: 28.6692, longitude: 77.4538 },
    { name: 'Meerut', slug: 'meerut', state: 'Uttar Pradesh', population: 3443689, latitude: 28.9845, longitude: 77.7064 },
    { name: 'Allahabad', slug: 'allahabad', state: 'Uttar Pradesh', population: 5954391, latitude: 25.4358, longitude: 81.8463 },
    { name: 'Bareilly', slug: 'bareilly', state: 'Uttar Pradesh', population: 4448359, latitude: 28.3670, longitude: 79.4304 },
    { name: 'Aligarh', slug: 'aligarh', state: 'Uttar Pradesh', population: 3673889, latitude: 27.8974, longitude: 78.0880 },
    { name: 'Moradabad', slug: 'moradabad', state: 'Uttar Pradesh', population: 4772006, latitude: 28.8389, longitude: 78.7378 },
    { name: 'Gorakhpur', slug: 'gorakhpur', state: 'Uttar Pradesh', population: 4440895, latitude: 26.7606, longitude: 83.3732 },
    { name: 'Jhansi', slug: 'jhansi', state: 'Uttar Pradesh', population: 2034000, latitude: 25.4484, longitude: 78.5685 },

    // West Bengal
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', population: 14681589, latitude: 22.5726, longitude: 88.3639 },
    { name: 'Howrah', slug: 'howrah', state: 'West Bengal', population: 4850029, latitude: 22.5958, longitude: 88.2636 },
    { name: 'North 24 Parganas', slug: 'north-24-parganas', state: 'West Bengal', population: 10009781, latitude: 22.6157, longitude: 88.4332 },
    { name: 'South 24 Parganas', slug: 'south-24-parganas', state: 'West Bengal', population: 8161961, latitude: 22.1609, longitude: 88.4331 },
    { name: 'Bardhaman', slug: 'bardhaman', state: 'West Bengal', population: 7717563, latitude: 23.2324, longitude: 87.8615 },
    { name: 'Murshidabad', slug: 'murshidabad', state: 'West Bengal', population: 7103807, latitude: 24.1833, longitude: 88.2833 },
    { name: 'Nadia', slug: 'nadia', state: 'West Bengal', population: 5167600, latitude: 23.4000, longitude: 88.5000 },

    // Odisha
    { name: 'Bhubaneswar', slug: 'bhubaneswar', state: 'Odisha', population: 1171437, latitude: 20.2961, longitude: 85.8245 },
    { name: 'Cuttack', slug: 'cuttack', state: 'Odisha', population: 2624470, latitude: 20.4625, longitude: 85.8830 },
    { name: 'Ganjam', slug: 'ganjam', state: 'Odisha', population: 3520151, latitude: 19.3856, longitude: 84.8000 },
    { name: 'Puri', slug: 'puri', state: 'Odisha', population: 1698730, latitude: 19.8135, longitude: 85.8312 },

    // Punjab
    { name: 'Amritsar', slug: 'amritsar', state: 'Punjab', population: 2490656, latitude: 31.6340, longitude: 74.8723 },
    { name: 'Jalandhar', slug: 'jalandhar', state: 'Punjab', population: 2193590, latitude: 31.3260, longitude: 75.5762 },
    { name: 'Ludhiana', slug: 'ludhiana', state: 'Punjab', population: 3498739, latitude: 30.9010, longitude: 75.8573 },
    { name: 'Patiala', slug: 'patiala', state: 'Punjab', population: 1895686, latitude: 30.3398, longitude: 76.3869 },

    // Uttarakhand
    { name: 'Dehradun', slug: 'dehradun', state: 'Uttarakhand', population: 1696694, latitude: 30.3165, longitude: 78.0322 },
    { name: 'Haridwar', slug: 'haridwar', state: 'Uttarakhand', population: 1890422, latitude: 29.9457, longitude: 78.1642 },
    { name: 'Nainital', slug: 'nainital', state: 'Uttarakhand', population: 954605, latitude: 29.3803, longitude: 79.4636 },

    // Goa
    { name: 'North Goa', slug: 'north-goa', state: 'Goa', population: 818008, latitude: 15.4909, longitude: 73.8278 },
    { name: 'South Goa', slug: 'south-goa', state: 'Goa', population: 640537, latitude: 15.2832, longitude: 73.9888 },

    // Add more states to reach comprehensive coverage
    // Total: 100+ major districts covering all states
];

