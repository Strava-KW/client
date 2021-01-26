import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function GooglePlacesInput(props) {
  const API_KEY = "AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);

  searchLocation = async (text) => {
    try {
      setSearchKeyword(text);
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
        })
        .then((response) => {
          console.log(response.data);
          setSearchResults(response.data.predictions);
          setIsShowingResults(true);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search for an address"
        returnKeyType="search"
        style={styles.searchBox}
        placeholderTextColor="#000"
        onChangeText={(text) => {
          searchLocation(text);
        }}
        value={searchKeyword}
      />
      {isShowingResults && (
        <FlatList
          data={searchResults}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => {
                  setSearchKeyword(item.structured_formatting.main_text);
                  setIsShowingResults(false);
                }}
              >
                <Text>{item.structured_formatting.main_text}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          style={styles.searchResultsContainer}
        />
      )}
    </View>
  );
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
});
