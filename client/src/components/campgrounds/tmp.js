import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import wpActions from '../../modules/wp/wpActions';
import Single from '../Single';
import Category from '../Category';
import Loader from '../../components/Loader';
import { trackPage } from '../../lib/helpers/analytics';
import { scrollToTop } from '../../lib/helpers/index';
export class ContentContainer extends Component {
  isCategorySlug = (slug, categories) => {
    if (!categories || !slug) {
      return undefined;
    }
    const findings = categories.find(category => {
      return category.slug === slug;
    });
    return Boolean(findings && findings.id > 0);
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      trackPage();
      scrollToTop();
    }
  };
  componentDidMount = () => {
    scrollToTop();
    if (!this.props.isLoading) {
      if (this.props.categories.length < 1) this.props.getCategories();
      trackPage();
    }
  };
  render() {
    const { categories, isLoading, error } = this.props;
    const slug = this.props.match.params.slug;
    if (isLoading) {
      return (
        <div>
          <Loader text="Just a little bit of patience, loading!" />
        </div>
      );
    }
    if (error) {
      return <div>ERROR OCCURRED: {error.message || error}</div>;
    }
    if (this.isCategorySlug(slug, categories)) {
      return <Category slug={slug} />;
    } else if (this.isCategorySlug(slug, categories) === false) {
      return <Single slug={slug} />;
    } else {
      return <div>hmm...</div>;
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.wp.isLoadingCategories,
    categories: state.wp.categories,
    error: state.wp.categoriesError
  };
};
const mapActionsToProps = {
  getCategories: wpActions.getCategoriesAction
};
const ConnectedContentContainer = withRouter(
  connect(mapStateToProps, mapActionsToProps)(ContentContainer)
);
export default ConnectedContentContainer;
