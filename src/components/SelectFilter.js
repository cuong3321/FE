import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { listGroups } from "../actions/groupActions";

const SelectFilter = ({ filterGroup, setFilterGroup, setPage }) => {
    const [current, setCurrent] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filterGroup);
    const dispatch = useDispatch();
    const groupList = useSelector((state) => state.groupList);
    const { groups } = groupList;

    useEffect(() => {
        dispatch(listGroups());
        // mapSelect().forEach((item) => {
        //     if (item.value === data) {
        //         setCurrent(item);
        //     }
        // });
    }, []);

    const mapSelect = () => {
        if (groups) {
            const mapped = groups.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            return mapped;
        } 
        return [];
         
    };

    const handleChange = (element) => {
       // setCurrent(element);
         setFilterGroup(element.value);
         setPage(1);
    };

    return (
        <ReactSelect
            options={mapSelect()}
            onChange={handleChange}
            value={searchTerm}
            placeholder="Select group"
        />
    );
};

export default SelectFilter;
