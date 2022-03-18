import React, { useEffect, useState } from 'react';
import { FormField } from 'components/FormField';
import { useRouter } from 'next/router';

const TableData: React.FC<TableDataProp> = ({ item, count }) => {

    if (Array.isArray(item)) {
        return (
            <div className="td-div">
                {item.map((data) => typeof data === "string" && <p key={count}> {data} </p>)}
            </div>
        )
    }

    if (typeof item === "object") {

        if (item?.["status"]) {
            const statusItem = String(item?.status || "").replace(" ", "-");
            return (
                <div className={`status-full-${statusItem}`}>
                    {item?.value || ""}
                </div>
            )
        }

    }

    if (typeof item === "string" || typeof item === "number") {
        return (
            <div className="td-div">
                <p> {item} </p>
            </div>
        )
    }

    return (
        <>
            {item || ""}
        </>

    )
}

export const Table: React.FC<TableProps> = (
    { from, heading, setMarkedTracker, OptionComponent,
        data, selectable, selectField, page, pages,
        uniqueKey, ...props
    }) => {

    const [selected, setSelected] = useState<Array<string>>([]);

    const router = useRouter();

    const selectARow = (e: string) => {

        selected.includes(e)
            ? setSelected([...selected].filter((val) => val !== e))
            : setSelected([...selected, e]);

    };

    useEffect(() => {
        if (typeof setMarkedTracker === 'function') {
            setMarkedTracker(selected);
        }
        // eslint-disable-next-line
    }, [selected]);

    const Pagination = () => <React.Fragment />

    return (
        <div className="table-component">
            <table>
                <thead>
                    <tr>
                        {selectable && <th />}
                        {(heading || []).map((head, index) => (
                            <React.Fragment key={`table-${uniqueKey}-head-${head}-${index}`}>
                                {!props.customThRenderer ?
                                    <th > {head} </th>
                                    :
                                    <props.customThRenderer item={head} />
                                }
                            </React.Fragment>

                        ))}
                        {OptionComponent && <th />}
                    </tr>
                </thead>
                <tbody>
                    {(data || []).map((data_, index) => {

                        const propsValue: any = data_.find((option) => typeof option === 'object' && [false, "link"].includes(option.render || ""))
                            || {};

                        const linkValue: string = propsValue?.to || "";

                        const click = () => selectARow(propsValue[selectField || "value"]);

                        return (
                            <tr
                                className="slideUpIn"
                                key={`table-${uniqueKey}-body-row-${from}-${index}`}
                                onClick={() => linkValue && router.push(linkValue)}
                            >
                                {selectable &&
                                    <td>
                                        <FormField
                                            type="checkbox"
                                            value={(selected || []).includes(propsValue[selectField || ""])}
                                            onChange={() => click()}
                                        />
                                    </td>
                                }

                                {data_.map(
                                    (item: TableDateObjType | any, index_: number) => {
                                        if (typeof item === 'number' || typeof item === 'string' || Array.isArray(item)) {
                                            return (
                                                <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`} >
                                                    <TableData item={item} count={`${index}-${index_}`} />
                                                </td>
                                            );

                                        }
                                        if (typeof item === 'object' && item?.["status"] && item?.render === undefined) {
                                            return (
                                                <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`} >
                                                    <TableData item={item} />
                                                </td>
                                            );
                                        }
                                        if (typeof item === "function") {
                                            return (
                                                <td key={`table-${uniqueKey}-col-${from}-${index}-${index_}`}
                                                    className={"td-button"}
                                                >
                                                    {item()}
                                                </td>
                                            );
                                        }
                                        return null;
                                    })
                                }

                                {
                                    OptionComponent &&
                                    <td>
                                        <OptionComponent {...propsValue} />
                                    </td>
                                }

                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {page && pages && <Pagination />}
        </div>
    );
};

interface TableProps {
    data?: Array<string | { render?: string | boolean | "link", to?: string, [key: string]: any } | string[]>[],
    heading?: Array<{} | string>,
    setMarkedTracker?(selected: any): void,
    OptionComponent?: React.FC,
    selectable?: boolean,
    selectField?: string,
    page?: number,
    pages?: number,
    uniqueKey?: string,
    from?: string,
    customTdRenderer?: React.ReactElement,
    customThRenderer?: React.FC<{ item: any }>,
};

interface TableDataProp {
    item?: string | TableDateObjType | number | any | string[],
    count?: string
}

interface TableDateObjType { status?: string, value?: string, render?: boolean | string }