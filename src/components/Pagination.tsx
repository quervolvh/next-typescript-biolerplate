import React from 'react';
import { FormField } from 'components';

export const Pagination: React.FC<Props> = ({ pages, page, isMobile, perPageSelector, empty , ...props }) => {

    // Sets the limit of pages to be displayed in either direction
    // i.e , direction to the left and right of the current page
    const directionLimit = isMobile ? 1 : 4;

    // Gets the amount of previous pages with regards to the current page
    let prevPagesToDisplay = Math.abs(page - directionLimit);

    // Assuming the current page number is less than 4, this value represents
    // the amount of pages greater than the current page to display
    const zeroPrevLimit = directionLimit * 2 - page;

    // Assuming the previous page limit is lesser than directionLimit
    // this calculation provides an improved better limit
    const ForwardLimit = directionLimit + (directionLimit - prevPagesToDisplay);

    //  Determines the amount of pages that should be displayed after the current page
    //  If its less than the previous number of pages ,  then we assign this value to the directionLimit
    //  Otherwise it becomes either the zeroPrevLimit or a calculation determining
    const nextPagesToDisplay =
        prevPagesToDisplay > directionLimit ? directionLimit : page < 4 ? zeroPrevLimit : ForwardLimit;

    // Creates an array from the number of pages we are provided with and
    // splices it so that the array only contains pages that are greater than the value of the current page
    let pages_ = [...Array(pages)].map((page, index) => index + 1).splice(page, nextPagesToDisplay);

    // Creates a limit for slicing the array of prevPage numbers
    const prevPageLengthLimit = directionLimit + (directionLimit - pages_.length);

    // Creates an array from the number of pages we are provided with and
    // splices it so that the array only contains pages that are less than the value of the current page
    let prevPages = [...Array(pages)].map((page, index) => index + 1).splice(0, page);

    prevPages = prevPages.reverse().splice(0, prevPageLengthLimit).reverse();

    // this function takes a user to the selected page
    const clickHer = (page: number) => props.onClick(page);

    if ( empty ) return (<></>);

    return (
        <div className="pagination-flex">

            {
                perPageSelector &&

                <div className="pagination-opt">
                    <b> Items per page </b>
                    <FormField
                        type="option"
                        onChange={() => null}
                        options={[
                            "10",
                            "15",
                            "20"
                        ]}
                        value={"10"} />
                </div>

            }



            <div className="pagination">
                <ul>

                    <li className='pagination-pages'>

                        <ul>

                            {page !== 1 && !prevPages.filter((page_, index) => (index >= page - 4)).includes(1) && (
                                <li
                                    onClick={() => clickHer(1)}
                                    role={"button"}
                                    tabIndex={0}>
                                    {' '}
                                    <i className="fas fa-angle-double-left" />{' '}
                                </li>
                            )}

                            {prevPages.map((page_, index) => index < 4 && (
                                <li
                                    key={`post-${page_}-${index}`}
                                    onClick={() => clickHer(page_)}
                                    className={page === page_ ? 'active' : 'passive'}
                                    role={"button"}
                                    tabIndex={0}
                                >
                                    {' '}
                                    {page_}{' '}
                                </li>
                            ))}

                            {!prevPages.filter(((page_, index) => index < 4)).includes(page) && !pages_.includes(page) && (
                                <li
                                    onClick={() => clickHer(page)}
                                    className="active"
                                    role={"button"}
                                    tabIndex={0}>
                                    {' '}
                                    {page}{' '}
                                </li>
                            )}

                            {pages_.map((page, index) => index < 4 && (
                                <li
                                    key={`post-${page}-${index}`}
                                    onClick={() => clickHer(page)}
                                    role={"button"}
                                    tabIndex={0}>
                                    {' '}
                                    {page}{' '}
                                </li>
                            ))}


                            {!pages_.filter((page, index) => index < 4).includes(pages) && (
                                <>
                                    <li>
                                        ...
                                    </li>
                                    <li>
                                        {pages}
                                    </li>
                                </>
                            )}

                        </ul>

                    </li>


                    <li className="direction-control">
                        <ul>

                            <li
                                onClick={() => clickHer(page - 1)}
                                role={"button"}
                                tabIndex={0}>
                                {' '}
                                <i className={`${page === 1 ? 'inactive' : ''} fas fa-chevron-left`} />{' '}
                            </li>


                            {page !== pages && !pages_.includes(page) && (
                                <li
                                    onClick={() => clickHer(page + 1)}
                                    className='passive'
                                    role={"button"}
                                    tabIndex={0}>
                                    {' '}
                                    <i className="fas fa-chevron-right" />{' '}
                                </li>
                            )}

                        </ul>

                    </li>


                    {/* {page !== pages && pages !== page + 1 && (
                    <li onClick={() => clickHer(pages)}>
                        {' '}
                        <i className="fas fa-angle-double-right" />{' '}
                    </li>
                )} */}
                </ul>
            </div>
        </div>

    );
};

interface Props { pages: number, page: number, isMobile: boolean, onClick(e: number): void, perPageSelector?: boolean , empty?: boolean }
