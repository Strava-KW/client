import React, {useState} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const API_KEY = "AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g";
export default function Component({navigation})=> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     searchKeyword: "",
  //     searchResults: [],
  //     isShowingResults: false,
  //   };
  // }
  const [searchKeyword, setSearchKeyword]= useState('')
  const [searchResults, setSearchResults]= useState([])
  const [isShowingResults, setIsShowingResults]= useState(false)

  searchLocation = async (text) => {
    setSearchKeyword(text);
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
      })
      .then((response) => {
          console.log(response.data);
          setSearchResults(response.data.predictions)
          setIsShowingResults(true)
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.autocompleteContainer}>
          <TextInput
            placeholder="Search for an address"
            returnKeyType="search"
            style={styles.searchBox}
            placeholderTextColor="#000"
            onChangeText={(text) => tsearchLocation(text)}
            value={searchKeyword}
          />
          {isShowingResults && (
            <FlatList
              data={searchResults}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>{
                      setSearchKeyword(item.description)
                      setIsShowingResults(false)

                    }}
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}
        </View>
        <View style={styles.dummmy} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  dummmy: {
    width: 600,
    height: 200,
    backgroundColor: "hotpink",
    marginTop: 20,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
