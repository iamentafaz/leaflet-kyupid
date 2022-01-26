import { userData } from "./userjson.js";
export const groupedData = {};

function fetchUserData() {
  const users = userData.users;
  users.forEach((element) => {
    if (element.area_id in groupedData) {
      groupedData[element.area_id].maleCount =
        element.gender === "M"
          ? groupedData[element.area_id].maleCount + 1
          : groupedData[element.area_id].maleCount;
      groupedData[element.area_id].femaleCount =
        element.gender === "F"
          ? groupedData[element.area_id].femaleCount + 1
          : groupedData[element.area_id].femaleCount;
      groupedData[element.area_id].pro_user = element.is_pro_user
        ? groupedData[element.area_id].pro_user + 1
        : groupedData[element.area_id].pro_user;
    } else {
      groupedData[element.area_id] = element.area_id;
      groupedData[element.area_id] = {
        maleCount: element.gender === "M" ? 1 : 0,
        femaleCount: element.gender === "F" ? 1 : 0,
        pro_user: element.is_pro_user ? 1 : 0,
      };
    }
  });
  console.log(groupedData);
}

fetchUserData();

// function fetchUserDataFromApi() {
//   fetch("https://kyupid-api.vercel.app/api/users")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.users);
//       const users = data.users;
//       users.forEach((element) => {
//         if (element.area_id in groupedData) {
//           console.log("hi", element.area_id);
//           groupedData[element.area_id].maleCount =
//             element.gender === "M"
//               ? groupedData[element.area_id].maleCount + 1
//               : groupedData[element.area_id].maleCount;
//           groupedData[element.area_id].femaleCount =
//             element.gender === "F"
//               ? groupedData[element.area_id].femaleCount + 1
//               : groupedData[element.area_id].femaleCount;
//         } else {
//           groupedData[element.area_id] = element.area_id;
//           groupedData[element.area_id] = {
//             maleCount: element.gender === "M" ? 1 : 0,
//             femaleCount: element.gender === "F" ? 1 : 0,
//             pro_user: element.is_pro_user ? 1 : 0,
//           };
//         }
//       });
//       console.log(groupedData);
//     });
// }
